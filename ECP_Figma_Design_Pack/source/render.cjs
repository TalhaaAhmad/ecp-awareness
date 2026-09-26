const fs=require('fs'),path=require('path');
const sharp=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/sharp');
const root=path.resolve(__dirname,'..');
(async()=>{
  fs.mkdirSync(root+'/previews',{recursive:true});
  for(const file of fs.readdirSync(root+'/svg').filter(x=>x.endsWith('.svg'))) {
    await sharp(root+'/svg/'+file,{density:96}).resize(file.includes('mobile')?390:1440).png().toFile(root+'/previews/'+file.replace('.svg','.png'));
    console.log(file);
  }
})();
