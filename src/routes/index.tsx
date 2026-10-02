import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/quiz/logo.svg";
import age18 from "@/assets/quiz/age-18.webp";
import age30 from "@/assets/quiz/age-30.webp";
import age40 from "@/assets/quiz/age-40.webp";
import age50 from "@/assets/quiz/age-50.webp";
import help from "@/assets/quiz/help.webp";
import gotYou from "@/assets/quiz/got-you.webp";
import notAlone from "@/assets/quiz/not-alone.webp";
import dreams from "@/assets/quiz/dreams.webp";
import universities from "@/assets/quiz/universities.webp";
import confidence from "@/assets/quiz/confidence.webp";
import profile from "@/assets/quiz/profile.png";
import brain from "@/assets/quiz/brain.webp";
import focus from "@/assets/quiz/focus.png";
import time from "@/assets/quiz/time.png";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Become a High-Value Woman — Muses Academy Quiz" },
    { name: "description", content: "Personalize your Make Him Miss You plan with the Muses Academy relationship quiz." },
    { property: "og:title", content: "Become a High-Value Woman — Muses Academy Quiz" },
    { property: "og:description", content: "Take the quiz to personalize your relationship plan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Quiz,
});

type Question = { kind?: "single" | "multi" | "scale"; section: string; title: string; subtitle?: string; options: string[]; image?: string };
type Info = { kind: "info"; title: string; body: string; image?: string; variant?: "research" | "coach" | "summary" | "plan" };
type Step = Question | Info;

const steps: Step[] = [
  {kind:"info",title:"500,000+ users already tried our Make Him Miss You Plan",body:"You don’t need to change—just unlock the secrets that make him crave you",variant:"research"},
  {section:"Love Life Profile",title:"What is your current relationship status?",options:["Single","Complicated","In relationship","Married"]},
  {section:"Love Life Profile",title:"What is your main goal?",options:["Attract the right man","Make him miss me","Get married","Rekindle the spark"]},
  {section:"Love Life Profile",title:"Who do you want to attract?",options:["Any man I’m interested in","My crush","My ex","My boyfriend","My husband","My fiancé"]},
  {kind:"info",title:"We can help make that happen!",body:"Many women struggle to reconnect with an ex, but our proven approaches can help you rebuild connection more naturally.",image:help},
  {section:"Love Life Profile",title:"How long have you been single?",options:["Less than 6 months","6 months to 1 year","1 to 3 years","More than 3 years"]},
  {section:"Love Life Profile",title:"Do you feel invisible to the man you like?",options:["Yes","No","Not sure"]},
  {section:"Love Life Profile",title:"Do you find yourself chasing his attention?",options:["Yes, more than I’d like","Sometimes","Rarely","Never"]},
  {section:"Love Life Profile",title:"Do you struggle to get him to make the first move?",options:["Yes","No"]},
  {section:"Love Life Profile",title:"Does he seem emotionally unavailable?",options:["Yes","Sometimes","No","Not sure"]},
  {section:"Love Life Profile",title:"Do you struggle with mixed signals?",options:["Yes, it’s confusing","Sometimes","No","Not sure"]},
  {section:"Love Life Profile",title:"Do you feel confident in flirting?",options:["Yes, I’m great at it","Sometimes, but I get nervous","Not really, I feel awkward","I avoid it altogether"]},
  {section:"Love Life Profile",title:"Have you ever been ghosted?",options:["Yes","Sometimes","Never"]},
  {section:"Love Life Profile",title:"How often do you feel like you give more than you take?",options:["Very often","Sometimes","Almost never"]},
  {kind:"multi",section:"Love Life Profile",title:"What are the main challenges in your love life?",subtitle:"Select all that apply",options:["Attracting the right man","Getting a man to commit","Keeping a man’s interest","Avoiding the wrong man","Dealing with rejection","Navigating online dating","Mixed signals","Other"]},
  {kind:"info",title:"We got you!",body:"You’ll discover proven methods to handle common challenges in love and build the kind of connection you truly want—with less stress and clearer progress.",image:gotYou},
  {section:"Love Life Profile",title:"When was the last time you felt loved and valued?",options:["Less than a year ago","2-3 years ago","Never","I feel loved and valued right now"]},
  {kind:"info",title:"You are not alone!",body:"It’s been a while, but love is still within reach. Our plan supports building connection and moving toward a deeper, more fulfilling relationship.",image:notAlone},
  {section:"Ideal Relationship",title:"Do you wish you had more control over men?",options:["Yes","No","Hmm, not sure"]},
  {section:"Ideal Relationship",title:"Would you like your man to express his love with gifts?",options:["Absolutely","Maybe","Not necessarily"]},
  {section:"Ideal Relationship",title:"What kind of gift would bring you the most joy?",options:["Romantic dinner","Flowers","Surprise trip","Jewelry","Dream dress"]},
  {section:"Ideal Relationship",title:"What's the top quality your partner should have?",options:["Kind","Faithful","Caring","Supportive","Family-Oriented"]},
  {section:"Ideal Relationship",title:"Would you enjoy being with a man who is obsessed with you?",options:["It's a dream","Somewhat","Maybe","Not necessary"]},
  {kind:"info",title:"Turn Dreams into Reality!",body:"Start living the love story you’ve always imagined. Discover simple, proven ways to build attraction and emotional closeness, so your connection feels alive and mutual.",image:dreams},
  {section:"Love & Psychology Skills",title:"How well you think you understand men?",options:["Very well, I can literally read his mind","Sometimes it's hard to understand what he's thinking","I have no idea what he's thinking"]},
  {kind:"info",title:"Built on Psychological Research",body:"Our plan is grounded in relationship and behavioral science from leading universities, including Oxford, Harvard, and Stanford.",image:universities},
  {section:"Love & Psychology Skills",title:"Have you tried any tricks to get a man's attention?",options:["Yes, I'm a master at it","No, never","I’ve tried a few, but they didn’t work"]},
  {section:"Love & Psychology Skills",title:"Are you comfortable with learning new skills?",options:["Yes","No","Hmm, not sure"]},
  {kind:"multi",section:"Love & Psychology Skills",title:"Which techniques are you already familiar with?",subtitle:"Choose all that apply",options:["Don't say yes","The “No contact” rule","Keeping the mystery","Easy to approach, hard to attain","End conversation first","None of the above"]},
  {kind:"scale",section:"Love & Psychology Skills",title:"Rate your knowledge of male psychology in relationships",subtitle:"Research shows that women who understand male psychology are twice as likely to have a successful marriage.",options:["Expert","Pro","Intermediate","Novice"]},
  {section:"Love & Psychology Skills",title:"Did you know touch triggers bonding hormones in men?",options:["No, never heard","I'm curious","Yes, I use it all the time"]},
  {section:"Love & Psychology Skills",title:"Did you know active listening deepens his attachment?",options:["Yes, I've heard it","I'm curious","No, this is news to me"]},
  {section:"Love & Psychology Skills",title:"Did you hear about Muses Academy from a relationship coach?",options:["Yes","No"]},
  {section:"Love & Psychology Skills",title:"Have you ever invested in self-improvement programs or coaching?",options:["Yes, multiple times","Yes, once or twice","No, but I'm open to it","No, and I'm skeptical"]},
  {kind:"info",title:"Your plan will be reviewed by practicing relationship coaches",body:"“MusesAcademy gives you psychology-backed techniques to trigger his deepest emotions and build unshakable attraction.”",image:brain,variant:"coach"},
  {kind:"multi",section:"Almost There",title:"What strategies would you like to know the most?",subtitle:"Select all that apply",options:["How to make him attached to me","How to make him miss me","How to read his mind to better control him","How to make him fall for me","How to make him more initiative"]},
  {kind:"scale",section:"Almost There",title:"Rate your readiness to master your love life",options:["All set\nI'm fully prepared","Ready\nI feel confident","Somewhat Ready\nI have some knowledge","Not Ready\nI need more preparation"]},
  {kind:"info",title:"Elevate Your Love Confidence!",body:"You’re already one step ahead. Step into your natural confidence and discover how to inspire deeper connection and attraction.",image:confidence},
  {section:"Almost There",title:"Do you find it easy to maintain your focus?",options:["Yes, I can easily stay focused","Mostly, but I sometimes get distracted","I often struggle","No, I frequently procrastinate"]},
  {kind:"info",title:"Summary of your profile",body:"You’re ready for real love, but unsure how to attract it. We’ll guide you toward the right man.",image:profile,variant:"summary"},
  {section:"Almost There",title:"Do you have an important event coming up?",subtitle:"Having something to look forward can be a great motivator to achieve your goal",options:["Birthday","Vacation","Financial deadline","Birth of a child","Retirement planning","No special event any time soon"]},
  {section:"Almost There",title:"When is your event?",subtitle:"We will keep this important event in mind for your journey",options:["In a week","In a month","In a few months","In the coming year","Skip this step"]},
  {section:"Almost There",title:"How much time are you ready to spend to improve your love life?",options:["5 min/day","10 min/day","15 min/day","20 min/day"],image:time},
  {kind:"info",title:"Your Perfect Plan to Attract the Right Man",body:"Based on your answers, we expect you to gain confidence and necessary skills in your love life by December 2026",variant:"plan"},
];

function Brand(){return <img src={logo} alt="Muses Academy" className="h-[22px] w-auto"/>}
function AppButton({children,onClick,disabled=false,className=""}:{children:React.ReactNode;onClick:()=>void;disabled?:boolean;className?:string}){return <button type="button" onClick={onClick} disabled={disabled} className={`quiz-button ${className}`}>{children}</button>}

function Quiz(){
 const [screen,setScreen]=useState(-1); const [answers,setAnswers]=useState<Record<number,string[]>>({});
 const [loading,setLoading]=useState(0);
 useEffect(()=>{if(screen!==steps.length)return; const id=window.setInterval(()=>setLoading(v=>Math.min(100,v+1)),45);return()=>window.clearInterval(id)},[screen]);
 const next=()=>setScreen(s=>s+1); const back=()=>setScreen(s=>Math.max(-1,s-1));
 const choose=(value:string,multi=false)=>{if(multi){setAnswers(a=>{const current=a[screen]??[];return {...a,[screen]:current.includes(value)?current.filter(x=>x!==value):[...current,value]}})}else{setAnswers(a=>({...a,[screen]:[value]}));window.setTimeout(next,180)}};
 if(screen<0)return <Welcome onStart={()=>setScreen(0)}/>;
 if(screen===steps.length)return <Loading progress={loading} onBack={back}/>;
 const step=steps[screen];
 if(!step)return <Welcome onStart={()=>setScreen(0)}/>;
 if(step.kind==="info")return <InfoPage step={step} onBack={back} onNext={next}/>;
 const selected=answers[screen]||[]; const progress=Math.round(((screen+1)/steps.length)*100);
 return <main className="quiz-shell">
   <div className="quiz-top"><button aria-label="Back" onClick={back} className="back-button"><ArrowLeft/></button><span className="section-pill">{step.section}</span><span className="top-spacer"/></div>
   <div className="progress-bars" aria-label={`${progress}% complete`}>{[0,1,2,3].map(i=><span key={i} className={progress>(i*25)?"active":""}/>)}</div>
   <section className="question-wrap">
    <h1>{step.title}</h1>{step.subtitle&&<p className="subtitle">{step.subtitle}</p>}
    {step.kind==="scale"&&<ScaleGraphic/>}
    <div className={`option-list ${step.kind==="scale"?"scale-options":""}`}>
      {step.options.map((option,i)=>{const active=selected.includes(option); return <AppButton key={option} onClick={()=>choose(option,step.kind==="multi")} className={`option-button ${active?"selected":""}`}>
        {step.kind!=="multi"&&<span className="option-icon">{i===0?<Heart/>:<Sparkles/>}</span>}
        <span>{option.split("\n").map((line,j)=><span key={line} className={j?"option-detail":""}>{line}</span>)}</span>
        {step.kind==="multi"&&<span className="check-circle">{active&&<Check/>}</span>}
      </AppButton>})}
    </div>
    {step.image&&<img src={step.image} alt="" className="question-image"/>}
   </section>
   {step.kind==="multi"&&<div className="sticky-action"><AppButton onClick={next} disabled={!selected.length}>CONTINUE</AppButton></div>}
 </main>
}

function Welcome({onStart}:{onStart:()=>void}){const ages=[[age18,"18-29"],[age30,"30-39"],[age40,"40-49"],[age50,"50+"]];return <main className="welcome"><Brand/><div className="welcome-copy"><h1>BECOME A HIGH-VALUE WOMAN</h1><h2>TO MAKE HIM OBSESSED</h2><p>Pass this quiz to personalize your subscription<br/>Start by selecting your age</p></div><div className="age-grid">{ages.map(([src,label])=><button key={label} onClick={onStart} className="age-card"><img src={src} alt=""/><span>{label}</span></button>)}</div><p className="legal">By continuing, you agree with <a href="https://quiz.musesacademy.io/terms">Terms & Conditions</a>, <a href="https://quiz.musesacademy.io/privacy">Privacy Policy</a>, <a href="https://quiz.musesacademy.io/subterms">Subscription Terms</a>.</p><footer>© 2026 APPSORAMA MEDIA LIMITED, Hong Kong. All rights reserved.</footer></main>}

function InfoPage({step,onBack,onNext}:{step:Info;onBack:()=>void;onNext:()=>void}){return <main className="quiz-shell info-page"><div className="info-header"><button aria-label="Back" onClick={onBack} className="back-button"><ArrowLeft/></button><Brand/><span className="top-spacer"/></div><section className="info-content">
 {step.variant==="research"?<Research step={step}/>:step.variant==="summary"?<Summary step={step}/>:step.variant==="plan"?<Plan step={step}/>:<><h1>{step.title}</h1><p>{step.body}</p>{step.image&&<img src={step.image} alt="" className={`info-image ${step.variant==="coach"?"coach-image":""}`}/>} {step.variant==="coach"&&<div className="coach-card"><strong>Content reviewed by an expert</strong><span>Santiago Delgado · Relationship Coach</span></div>}</>}
 </section><div className="sticky-action"><AppButton onClick={onNext}>CONTINUE</AppButton></div></main>}
function Research({step}:{step:Info}){return <><div className="research-number">500,000+ users</div><div className="research-kicker">already tried our</div><h1>Make Him Miss You Plan</h1><p>{step.body}</p><div className="team-card"><div className="avatar">MA</div><span><strong>Muses Academy Team</strong><small>Backed by scientific research from leading universities.</small></span></div></>}
function Summary({step}:{step:Info}){return <><h1 className="center-title">{step.title}</h1><div className="summary-card"><div className="summary-label"><strong>Confidence level</strong><small>Perfect</small></div><div className="confidence-meter"><i/></div><div className="meter-labels"><span>Low</span><span>Intermediate</span><span>High</span></div></div><div className="summary-note"><strong>♨ Impressive score to succeed in love life!</strong><p>{step.body}</p></div><div className="profile-card"><div className="traits"><span>🎯 <small>Motivation</small><b>High</b></span><span>⭐ <small>Potential</small><b>High</b></span><span>◷ <small>Focus</small><b>Broad</b></span><span>📚 <small>Knowledge</small><b>High</b></span></div><img src={step.image} alt=""/></div><small className="illustrative">For illustrative purposes only</small></>}
function Plan({step}:{step:Info}){return <><h1 className="plan-title"><span>Your Perfect Plan to</span>Attract the Right Man</h1><p>{step.body}</p><div className="chart"><div className="chart-line"/><div className="chart-months"><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span></div><div className="chart-label"><span>Now</span><span>Love Life Master</span></div></div><small className="illustrative">This chart is for illustrative purpose only, result may vary.</small></>}
function ScaleGraphic(){return <div className="scale-graphic"><div className="scale-person"><img src={focus} alt=""/></div><div className="scale-lines"><span/><span/><span/><span/></div></div>}
function Loading({progress,onBack}:{progress:number;onBack:()=>void}){const label=progress<30?"Setting goals":progress<65?"Analyzing answers":progress<100?"Personalizing your plan":"Your plan is ready";return <main className="quiz-shell loading-page"><div className="info-header"><button aria-label="Back" onClick={onBack} className="back-button"><ArrowLeft/></button><Brand/><span className="top-spacer"/></div><h1><span>500,000+ users</span>have chosen MusesAcademy</h1><p>Creating your personal plan...</p><div className="loading-label"><span>{label}</span><span>{progress}%</span></div><div className="loading-bar"><i style={{width:`${progress}%`}}/></div><Review/></main>}
function Review(){return <div className="review-card"><div className="review-head"><span className="review-avatar">K</span><span><b>Kass</b><small>1 reviews · US</small></span></div><div className="review-stars">★★★★★ <small>Verified</small></div><b>I actually just started doing this step...</b><p>I actually just started doing this step and it’s been 4 days he just texted I miss you.</p><small>Date of experience: May 15, 2025</small></div>}
