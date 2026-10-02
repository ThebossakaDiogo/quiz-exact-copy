import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight, Heart, LockKeyhole, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/quiz/logo.svg";
import age18 from "@/assets/quiz/age-18.webp";
import age30 from "@/assets/quiz/age-30.webp";
import age40 from "@/assets/quiz/age-40.webp";
import age50 from "@/assets/quiz/age-50.webp";
import universities from "@/assets/quiz/universities.webp";
import brain from "@/assets/quiz/brain.webp";
import profileAsset from "@/assets/quiz/profile.webp.asset.json";
import focusAsset from "@/assets/quiz/focus.webp.asset.json";
import timeAsset from "@/assets/quiz/time.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: age18, fetchPriority: "high" }],
    meta: [
    { title: "Conviértete en una mujer de alto valor — Quiz de Muses Academy" },
    { name: "description", content: "Personaliza tu plan para despertar su interés con el quiz de relaciones de Muses Academy." },
    { property: "og:title", content: "Conviértete en una mujer de alto valor — Quiz de Muses Academy" },
    { property: "og:description", content: "Haz el quiz y recibe un plan personalizado para tu vida amorosa." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quiz,
});

type Question = { kind?: "single" | "multi" | "scale"; section: string; title: string; subtitle?: string; options: string[]; image?: string };
type Info = { kind: "info"; title: string; body: string; image?: string; variant?: "research" | "coach" | "summary" | "plan" };
type Step = Question | Info;

const steps: Step[] = [
  {kind:"info",title:"Más de 500.000 mujeres ya probaron nuestro plan para despertar su interés",body:"No tienes que cambiar quién eres. Solo necesitas descubrir cómo crear una conexión auténtica que despierte su interés.",variant:"research"},
  {section:"Tu vida amorosa",title:"¿Cuál es tu situación sentimental actual?",options:["Soltera","Es complicado","En una relación","Casada"]},
  {section:"Tu vida amorosa",title:"¿Qué te gustaría lograr en tu vida amorosa?",options:["Atraer al hombre indicado","Hacer que me extrañe","Casarme","Reavivar la conexión"]},
  {section:"Tu vida amorosa",title:"¿Sientes que tienes que esforzarte demasiado para llamar su atención?",options:["Sí, más de lo que quisiera","A veces","Rara vez","Nunca"]},
  {section:"Tu vida amorosa",title:"¿Te confunden sus señales contradictorias?",options:["Sí, me confunden mucho","A veces","No","No estoy segura"]},
  {kind:"multi",section:"Tu vida amorosa",title:"¿Cuáles son tus principales desafíos en el amor?",subtitle:"Selecciona todas las que correspondan",options:["Atraer al hombre indicado","Lograr una relación seria","Mantener vivo su interés","Evitar relaciones que no me hacen bien","Superar el rechazo","Conocer personas en línea","Entender señales contradictorias","Otro"]},
  {section:"Tu vida amorosa",title:"¿Cuándo fue la última vez que te sentiste amada y valorada?",options:["Hace menos de un año","Hace 2 o 3 años","Nunca","Me siento amada y valorada ahora"]},
  {section:"Tu relación ideal",title:"¿Qué cualidad valoras más en una pareja?",options:["Amable","Fiel","Cariñoso","Que me apoye","Que valore a la familia"]},
  {section:"Amor y psicología",title:"¿Qué tan bien sientes que entiendes a los hombres?",options:["Muy bien, casi puedo leer su mente","A veces me cuesta entender lo que piensa","No tengo idea de lo que piensa"]},
  {kind:"info",title:"Basado en investigación psicológica",body:"Nuestro plan se basa en estudios sobre relaciones y comportamiento de universidades reconocidas como Oxford, Harvard y Stanford.",image:universities},
  {section:"Amor y psicología",title:"¿Has probado alguna estrategia para llamar la atención de un hombre?",options:["Sí, se me da muy bien","No, nunca","Probé algunas, pero no funcionaron"]},
  {kind:"multi",section:"Amor y psicología",title:"¿Qué técnicas ya conoces?",subtitle:"Selecciona todas las que correspondan",options:["No decir que sí de inmediato","La regla de contacto cero","Mantener el misterio","Ser cercana sin estar siempre disponible","Terminar la conversación primero","Ninguna de las anteriores"]},
  {kind:"scale",section:"Amor y psicología",title:"¿Cuánto sabes sobre la psicología masculina en las relaciones?",subtitle:"Los estudios indican que comprender mejor la psicología masculina puede ayudarte a construir relaciones más sanas y duraderas.",options:["Experta","Avanzada","Intermedia","Principiante"]},
  {section:"Amor y psicología",title:"¿Alguna vez invertiste en programas de crecimiento personal o coaching?",options:["Sí, varias veces","Sí, una o dos veces","No, pero estoy abierta a hacerlo","No, y todavía tengo dudas"]},
  {kind:"info",title:"Tu plan será revisado por coaches de relaciones",body:"“Muses Academy te brinda herramientas basadas en psicología para crear una conexión emocional profunda y una atracción genuina.”",image:brain,variant:"coach"},
  {kind:"multi",section:"Ya casi terminamos",title:"¿Qué estrategias te gustaría aprender primero?",subtitle:"Selecciona todas las que correspondan",options:["Cómo crear una conexión más profunda","Cómo hacer que me extrañe","Cómo comprender mejor lo que piensa","Cómo despertar sus sentimientos por mí","Cómo motivarlo a tomar la iniciativa"]},
  {kind:"scale",section:"Ya casi terminamos",title:"¿Qué tan preparada te sientes para transformar tu vida amorosa?",options:["Totalmente lista\nMe siento preparada","Lista\nConfío en mí","Casi lista\nYa tengo algunos conocimientos","Aún no\nNecesito más preparación"]},
  {section:"Ya casi terminamos",title:"¿Te resulta fácil mantenerte enfocada?",options:["Sí, me concentro con facilidad","La mayoría de las veces, aunque a veces me distraigo","Me cuesta con frecuencia","No, suelo dejar las cosas para después"]},
  {kind:"info",title:"Resumen de tu perfil",body:"Estás lista para vivir un amor real, aunque todavía tengas dudas sobre cómo encontrarlo. Te acompañaremos paso a paso.",image:profileAsset.url,variant:"summary"},
  {section:"Ya casi terminamos",title:"¿Cuánto tiempo al día quieres dedicar a mejorar tu vida amorosa?",options:["5 min al día","10 min al día","15 min al día","20 min al día"],image:timeAsset.url},
  {kind:"info",title:"Tu plan ideal para atraer al hombre indicado",body:"Según tus respuestas, puedes desarrollar la confianza y las habilidades que necesitas para transformar tu vida amorosa antes de diciembre de 2026.",variant:"plan"},
];

const encouragements = [
  "Este momento es para ti.",
  "Cada respuesta revela algo valioso sobre ti.",
  "Tu claridad emocional está creciendo.",
  "Estás más cerca de la relación que deseas.",
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
 const questionNumber=steps.slice(0,screen+1).filter(item=>item.kind!=="info").length;
 const encouragement=encouragements[Math.min(3,Math.floor(progress/26))];
 return <main className="quiz-shell">
   <div className="quiz-top"><button aria-label="Volver" onClick={back} className="back-button"><ArrowLeft/></button><Brand/><span className="progress-percent">{progress}%</span></div>
   <div className="journey-row"><span>Tu viaje de transformación</span><strong>Pregunta {questionNumber} de 16</strong></div>
   <div className="progress-track" aria-label={`${progress}% completado`}><i style={{width:`${progress}%`}}/></div>
   <section key={screen} className="question-wrap animate-fade-in">
    <div className="encouragement"><Sparkles/><span>{encouragement}</span></div>
    <h1>{step.title}</h1>{step.subtitle&&<p className="subtitle">{step.subtitle}</p>}
    {step.kind==="scale"&&<ScaleGraphic/>}
    <div className={`option-list ${step.kind==="scale"?"scale-options":""}`}>
      {step.options.map((option)=>{const active=selected.includes(option); return <AppButton key={option} onClick={()=>choose(option,step.kind==="multi")} className={`option-button ${active?"selected":""}`}>
        <span className="option-copy">{option.split("\n").map((line,j)=><span key={line} className={j?"option-detail":""}>{line}</span>)}</span>
        <span className="check-circle">{active?<Check/>:<ChevronRight/>}</span>
      </AppButton>})}
    </div>
    {step.image&&<img src={step.image} alt="" className="question-image" loading="lazy" decoding="async"/>}
    <div className="privacy-note"><LockKeyhole/> Tus respuestas son privadas y seguras</div>
   </section>
   {step.kind==="multi"&&<div className="sticky-action"><AppButton onClick={next} disabled={!selected.length}>CONTINUAR</AppButton></div>}
 </main>
}

function Welcome({onStart}:{onStart:()=>void}){const ages=[[age18,"18-29"],[age30,"30-39"],[age40,"40-49"],[age50,"50+"]];return <main className="welcome"><Brand/><div className="welcome-copy animate-fade-in"><span className="welcome-kicker"><Sparkles/> Tu nueva etapa comienza aquí</span><h1>CONVIÉRTETE EN LA MUJER QUE <em>SIEMPRE SUPISTE QUE PODÍAS SER</em></h1><p>Descubre qué está bloqueando tu vida amorosa y recibe un plan creado para ti.</p><div className="welcome-proof"><span><b>500.000+</b> mujeres</span><span><b>3 min</b> para ti</span><span><b>100%</b> personal</span></div><h2>¿Cuál es tu edad?</h2><small>Elige una opción para comenzar</small></div><div className="age-grid">{ages.map(([src,label],index)=><button key={label} onClick={onStart} className="age-card"><img src={src} alt="" loading={index===0?"eager":"lazy"} decoding="async" fetchPriority={index===0?"high":"auto"}/><span>{label}<ChevronRight/></span></button>)}</div><div className="safe-line"><LockKeyhole/> Tus respuestas son privadas y seguras</div><p className="legal">Al continuar, aceptas los <a href="https://quiz.musesacademy.io/terms">Términos y condiciones</a>, <a href="https://quiz.musesacademy.io/privacy">Política de privacidad</a>, <a href="https://quiz.musesacademy.io/subterms">Términos de suscripción</a>.</p><footer>© 2026 APPSORAMA MEDIA LIMITED, Hong Kong. Todos los derechos reservados.</footer></main>}

function InfoPage({step,onBack,onNext}:{step:Info;onBack:()=>void;onNext:()=>void}){return <main className="quiz-shell info-page"><div className="info-header"><button aria-label="Volver" onClick={onBack} className="back-button"><ArrowLeft/></button><Brand/><span className="top-spacer"/></div><section className="info-content animate-fade-in">
  {step.variant==="research"?<Research step={step}/>:step.variant==="summary"?<Summary step={step}/>:step.variant==="plan"?<Plan step={step}/>:<><h1>{step.title}</h1><p>{step.body}</p>{step.image&&<img src={step.image} alt="" className={`info-image ${step.variant==="coach"?"coach-image":""}`} loading="lazy" decoding="async"/>} {step.variant==="coach"&&<div className="coach-card"><strong>Contenido revisado por un especialista</strong><span>Santiago Delgado · Coach de relaciones</span></div>}</>}
 </section><div className="sticky-action"><AppButton onClick={onNext}>CONTINUAR</AppButton></div></main>}
function Research({step}:{step:Info}){return <><div className="milestone-icon"><Heart/></div><div className="research-number">Más de 500.000 mujeres</div><div className="research-kicker">ya dieron el primer paso</div><h1>Ahora es tu momento de brillar</h1><p>{step.body}</p><div className="team-card"><div className="avatar">MA</div><span><strong>Creado para tu momento</strong><small>Con herramientas inspiradas en psicología y relaciones.</small></span></div></>}
function Summary({step}:{step:Info}){return <><h1 className="center-title">{step.title}</h1><div className="summary-card"><div className="summary-label"><strong>Nivel de confianza</strong><small>Excelente</small></div><div className="confidence-meter"><i/></div><div className="meter-labels"><span>Bajo</span><span>Intermedio</span><span>Alto</span></div></div><div className="summary-note"><strong>♨ ¡Tienes un gran potencial para transformar tu vida amorosa!</strong><p>{step.body}</p></div><div className="profile-card"><div className="traits"><span>🎯 <small>Motivación</small><b>Alto</b></span><span>⭐ <small>Potencial</small><b>Alto</b></span><span>◷ <small>Enfoque</small><b>Amplio</b></span><span>📚 <small>Conocimiento</small><b>Alto</b></span></div><img src={step.image} alt="" loading="lazy" decoding="async"/></div><small className="illustrative">Imagen con fines ilustrativos</small></>}
function Plan({step}:{step:Info}){return <><h1 className="plan-title"><span>Tu plan ideal para</span>atraer al hombre indicado</h1><p>{step.body}</p><div className="chart"><div className="chart-line"/><div className="chart-months"><span>Oct</span><span>Nov</span><span>Dic</span><span>Ene</span></div><div className="chart-label"><span>Ahora</span><span>Confianza en el amor</span></div></div><small className="illustrative">Este gráfico es ilustrativo; los resultados pueden variar.</small></>}
function ScaleGraphic(){return <div className="scale-graphic"><div className="scale-person"><img src={focusAsset.url} alt="" loading="lazy" decoding="async"/></div><div className="scale-lines"><span/><span/><span/><span/></div></div>}
function Loading({progress,onBack}:{progress:number;onBack:()=>void}){const label=progress<30?"Definiendo tus objetivos":progress<65?"Analizando tus respuestas":progress<100?"Personalizando tu plan":"Tu plan está listo";return <main className="quiz-shell loading-page"><div className="info-header"><button aria-label="Volver" onClick={onBack} className="back-button"><ArrowLeft/></button><Brand/><span className="top-spacer"/></div><h1><span>Más de 500.000 mujeres</span>eligieron Muses Academy</h1><p>Estamos creando tu plan personal...</p><div className="loading-label"><span>{label}</span><span>{progress}%</span></div><div className="loading-bar"><i style={{width:`${progress}%`}}/></div><Review/></main>}
function Review(){return <div className="review-card"><div className="review-head"><span className="review-avatar">K</span><span><b>Kass</b><small>1 reseña · EE. UU.</small></span></div><div className="review-stars">★★★★★ <small>Verificada</small></div><b>Apenas comencé a aplicar este paso...</b><p>Apenas comencé a aplicar este paso y, después de cuatro días, me escribió para decirme que me extraña.</p><small>Fecha de la experiencia: 15 de mayo de 2025</small></div>}
