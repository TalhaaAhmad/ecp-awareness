// This importer adds a new page. It does not alter existing pages or send data over the network.
async function createECPDesign(DESIGN) {
  const fonts = [{family:'Inter',style:'Regular'},{family:'Inter',style:'Semi Bold'},{family:'Inter',style:'Bold'}];
  await Promise.all(fonts.map(font=>figma.loadFontAsync(font)));
  const page=figma.createPage();
  page.name='ECP • Website design';
  await figma.setCurrentPageAsync(page);
  const rgb=hex=>({r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255});
  const solid=hex=>[{type:'SOLID',color:rgb(hex)}];
  const assets={};
  function decodeBase64(str) {
    const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const clean=str.replace(/=+$/,'');
    const out=new Uint8Array(Math.floor(clean.length*6/8));
    let value=0,bits=0,pos=0;
    for(let i=0;i<clean.length;i++) {value=(value<<6)|alphabet.indexOf(clean[i]);bits+=6;if(bits>=8){bits-=8;out[pos++]=(value>>bits)&255;}}
    return out;
  }
  for(const key of Object.keys(DESIGN.assets)) {
    const a=DESIGN.assets[key];
    assets[key]={...a,hash:figma.createImage(decodeBase64(a.base64)).hash};
  }
  const textNode=a=>{
    const node=figma.createText();
    node.name=a.name;
    node.fontName=fonts[a.weight>=700?2:a.weight>=600?1:0];
    node.fontSize=a.size;
    node.lineHeight={unit:'PIXELS',value:a.lh};
    node.characters=a.text;
    node.fills=solid(a.fill);
    node.textAlignHorizontal=a.align.toUpperCase();
    node.textAutoResize='NONE';
    node.resize(a.w,a.h);
    return node;
  };
  const masterBox=figma.createFrame();
  masterBox.name='Reusable button components';masterBox.fills=[];masterBox.resize(700,150);masterBox.x=1520;masterBox.y=3360;
  const buttonMasters={};
  for(const [index,variant] of ['primary','outline','soft'].entries()) {
    const c=figma.createComponent();c.name='Button / '+variant;c.resize(200,50);c.cornerRadius=12;
    c.fills=solid(variant==='primary'?DESIGN.colors.green:variant==='outline'?'#FFFFFF':DESIGN.colors.mint);
    c.strokes=variant==='outline'?solid(DESIGN.colors.green):[];c.strokeWeight=1;
    c.layoutMode='HORIZONTAL';c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
    c.primaryAxisAlignItems='CENTER';c.counterAxisAlignItems='CENTER';c.paddingLeft=16;c.paddingRight=16;
    const label=textNode({name:'Label',weight:600,size:15,lh:22,text:'Button label',fill:variant==='primary'?'#FFFFFF':DESIGN.colors.green,align:'center',w:164,h:22});
    label.textAutoResize='WIDTH_AND_HEIGHT';c.appendChild(label);masterBox.appendChild(c);c.x=index*232;c.y=40;
    buttonMasters['Button / '+variant]=c;
  }
  const links=[];
  function createNode(a,parent) {
    let node;
    if(a.type==='group'&&buttonMasters[a.component]) {
      node=buttonMasters[a.component].createInstance();node.resize(a.w,a.h);
      const label=node.findOne(n=>n.type==='TEXT');label.characters=a.label;
    } else if(a.type==='group') {
      node=figma.createFrame();node.resize(a.w,a.h);node.fills=a.fill?solid(a.fill):[];node.clipsContent=false;node.cornerRadius=a.r||0;
      if(a.stroke){node.strokes=solid(a.stroke);node.strokeWeight=1;node.strokeAlign='INSIDE';}
      for(const child of a.children)createNode(child,node);
    } else if(a.type==='rect'||a.type==='ellipse') {
      node=a.type==='rect'?figma.createRectangle():figma.createEllipse();node.resize(a.w,a.h);node.fills=solid(a.fill);
      if(a.type==='rect')node.cornerRadius=a.r||0;
      if(a.stroke){node.strokes=solid(a.stroke);node.strokeWeight=1;node.strokeAlign='INSIDE';}
    } else if(a.type==='text') {
      node=textNode(a);
    } else if(a.type==='path') {
      const width=a.name.includes('wave')?parent.width:24,height=a.name.includes('wave')?50:24;
      const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+width+'" height="'+height+'" viewBox="0 0 '+width+' '+height+'"><path d="'+a.d+'" fill="'+a.fill+'" stroke="'+a.stroke+'" stroke-width="'+a.sw+'" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      node=figma.createNodeFromSvg(svg);
    } else if(a.type==='image') {
      node=figma.createFrame();node.resize(a.w,a.h);node.fills=[];node.cornerRadius=a.r||0;node.clipsContent=true;
      const asset=assets[a.asset],crop=a.crop,scale=Math.max(a.w/crop[2],a.h/crop[3]);
      const image=figma.createRectangle();image.name='Original '+asset.file+' (unmodified)';
      image.resize(asset.w*scale,asset.h*scale);image.fills=[{type:'IMAGE',imageHash:asset.hash,scaleMode:'FILL'}];
      node.appendChild(image);image.x=-crop[0]*scale-(crop[2]*scale-a.w)/2;image.y=-crop[1]*scale-(crop[3]*scale-a.h)/2;
      node.setPluginData('originalAsset',asset.file);node.setPluginData('crop',JSON.stringify(crop));
    } else {throw new Error('Unsupported scene type: '+a.type);}
    node.name=a.name;parent.appendChild(node);node.x=a.x||0;node.y=a.y||0;
    if(a.target)links.push([node,a.target]);
    return node;
  }
  const frameMap={},positions={
    'home-desktop':[0,0],'quiz-desktop':[1520,0],'game-desktop':[3040,0],
    'home-mobile':[0,2140],'quiz-mobile':[470,2140],'game-mobile':[940,2140],
    'design-system':[1520,2140]
  };
  for(const data of DESIGN.frames) {
    const f=figma.createFrame();f.name=data.name;f.resize(data.w,data.h);f.fills=solid(data.bg);f.clipsContent=true;
    [f.x,f.y]=positions[data.id];frameMap[data.id]=f;
    for(const a of data.nodes)createNode(a,f);
    f.setPluginData('layoutId',data.id);
  }
  for(const [node,target] of links) {
    if(frameMap[target])await node.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:frameMap[target].id,navigation:'NAVIGATE',transition:null,preserveScrollPosition:false}]}]);
  }
  for(const [i,key] of ['home','quiz','game'].entries()) {
    const a=assets[key];
    const ref=figma.createFrame();ref.name='Reference / '+a.file;ref.resize(630,630*a.h/a.w);ref.x=i*690;ref.y=4410;ref.fills=[];
    const original=figma.createRectangle();original.name='Original supplied reference';original.resize(ref.width,ref.height);original.fills=[{type:'IMAGE',imageHash:a.hash,scaleMode:'FIT'}];ref.appendChild(original);
  }
  for(const [name,color] of Object.entries(DESIGN.colors)) {
    const style=figma.createPaintStyle();style.name='ECP / '+name;style.paints=solid(color);
  }
  figma.currentPage.selection=[frameMap['home-desktop'],frameMap['quiz-desktop'],frameMap['game-desktop']];
  figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
  figma.closePlugin('Created 6 website layouts, a design system, components, and original references.');
}
createECPDesign(DESIGN).catch(error=>{console.error(error);figma.closePlugin('Import stopped: '+error.message);});
