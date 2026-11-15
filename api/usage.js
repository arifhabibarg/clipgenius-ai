export default async function handler(req,res){
 if(req.method!=="GET"){res.setHeader("Allow","GET");return res.status(405).json({error:"Method not allowed"});}
 const key=process.env.LUMICLIP_API_KEY;if(!key)return res.status(200).json({configured:false});
 try{const r=await fetch("https://api.lumiclip.ai/api/v1/usage",{headers:{Authorization:"Bearer "+key}});const data=await r.json().catch(()=>({}));return res.status(r.status).json({configured:true,...data})}
 catch(e){return res.status(502).json({error:"Usage তথ্য আনা যায়নি"})}
}