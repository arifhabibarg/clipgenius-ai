export default async function handler(req,res){
 if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({error:"Method not allowed"});}
 const key=process.env.LUMICLIP_API_KEY;if(!key)return res.status(503).json({error:"LumiClip API Key সেট করা নেই"});
 const id=String(req.query?.id||"").trim();if(!id)return res.status(400).json({error:"Project ID missing"});
 try{const r=await fetch("https://api.lumiclip.ai/api/v1/projects/"+encodeURIComponent(id),{headers:{Authorization:"Bearer "+key}});const data=await r.json().catch(()=>({}));return res.status(r.status).json(data)}
 catch(e){return res.status(502).json({error:"প্রজেক্টের অবস্থা আনা যায়নি: "+e.message})}
}