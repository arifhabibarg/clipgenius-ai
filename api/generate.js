export default async function handler(req,res){
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({error:"Method not allowed"});}
  const key=process.env.LUMICLIP_API_KEY;
  if(!key)return res.status(503).json({error:"সার্ভারে LumiClip API Key সেট করা নেই।"});
  try{
    const body=typeof req.body==="string"?JSON.parse(req.body):req.body||{};
    const url=String(body.url||"").trim();
    let u;try{u=new URL(url)}catch{return res.status(400).json({error:"সঠিক YouTube URL দিন"});}
    const hosts=["youtube.com","www.youtube.com","m.youtube.com","youtu.be","www.youtube-nocookie.com"];
    if(!hosts.includes(u.hostname)||!(u.searchParams.has("v")||u.hostname==="youtu.be"&&u.pathname.length>1||u.pathname.includes("/shorts/")||u.pathname.includes("/embed/")))return res.status(400).json({error:"সঠিক YouTube ভিডিও লিংক দিন"});
    const upstream=await fetch("https://api.lumiclip.ai/api/v1/clips/generate",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({url})});
    const raw=await upstream.text();
    let data;try{data=raw?JSON.parse(raw):{};}catch{data={message:raw.slice(0,700)};}
    if(!upstream.ok){
      const message=data.error||data.message||data.detail||("LumiClip API error ("+upstream.status+")");
      return res.status(upstream.status).json({error:message,provider_status:upstream.status,details:data});
    }
    return res.status(upstream.status).json(data);
  }catch(e){return res.status(502).json({error:"AI সার্ভারের সঙ্গে যোগাযোগ করা যায়নি: "+e.message});}
}