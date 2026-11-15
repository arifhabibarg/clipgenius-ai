export default async function handler(req,res){
 if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({error:"Method not allowed"});}
 const key=process.env.LUMICLIP_API_KEY;
 if(!key)return res.status(503).json({configured:false,error:"সার্ভারে LumiClip API Key সেট করা নেই।"});
 try{
  const upstream=await fetch("https://api.lumiclip.ai/api/v1/account/usage",{headers:{Authorization:"Bearer "+key,Accept:"application/json"}});
  const raw=await upstream.text();
  let data;try{data=raw?JSON.parse(raw):{};}catch{data={message:raw.slice(0,500)};}
  if(!upstream.ok)return res.status(upstream.status).json({configured:true,error:data.error||data.message||"LumiClip usage তথ্য দিতে পারেনি",details:data});
  return res.status(200).json({configured:true,...data});
 }catch(e){return res.status(502).json({configured:true,error:"Usage তথ্য আনা যায়নি: "+e.message});}
}