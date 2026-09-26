from pathlib import Path
import base64, json, html, shutil

ROOT=Path(__file__).resolve().parents[1]
UP=ROOT/'assets'
ASSETS={
 'home':{'file':'home-reference.jpeg','source':'WhatsApp Image 2026-09-25 at 08.20.26.jpeg','w':1123,'h':1431},
 'quiz':{'file':'quiz-reference.jpeg','source':'WhatsApp Image 2026-09-25 at 08.20.40.jpeg','w':1114,'h':1500},
 'game':{'file':'game-reference.jpeg','source':'WhatsApp Image 2026-09-25 at 08.20.50.jpeg','w':1125,'h':1422},
}
for a in ASSETS.values():
 a['base64']=base64.b64encode((UP/a['file']).read_bytes()).decode()

C={'green':'#006B49','forest':'#003F32','ink':'#122F29','muted':'#56716A','mint':'#E8F6EE','line':'#D8E7DF','bg':'#F8FBF8','white':'#FFFFFF','blue':'#1165B5','paleBlue':'#EAF4FC','purple':'#7134A5','palePurple':'#F3EDF9','gold':'#956B00','paleGold':'#FFF7DB'}
F=[]
def frame(id,name,w,h):
 f={'id':id,'name':name,'w':w,'h':h,'bg':C['bg'],'nodes':[]};F.append(f);return f['nodes']
def group(nodes,name,x,y,w,h,bg=None,r=0,border=None):
 n={'type':'group','name':name,'x':x,'y':y,'w':w,'h':h,'r':r,'children':[]}
 if bg:n['fill']=bg
 if border:n['stroke']=border
 nodes.append(n);return n['children']
def rect(n,name,x,y,w,h,fill,r=0,stroke=None):
 d={'type':'rect','name':name,'x':x,'y':y,'w':w,'h':h,'fill':fill,'r':r}
 if stroke:d['stroke']=stroke
 n.append(d)
def txt(n,text,x,y,w,size=16,color=None,weight=400,lh=None,align='left',name=None):
 n.append({'type':'text','name':name or text.replace('\n',' ')[:70],'text':text,'x':x,'y':y,'w':w,'h':(lh or size*1.35)*len(text.split('\n')),'size':size,'weight':weight,'lh':lh or size*1.35,'fill':color or C['ink'],'align':align})
def img(n,name,asset,crop,x,y,w,h,r=0):
 n.append({'type':'image','name':name,'asset':asset,'crop':crop,'x':x,'y':y,'w':w,'h':h,'r':r})
def path(n,name,d,color,x=0,y=0,fill='none',sw=2):
 n.append({'type':'path','name':name,'d':d,'stroke':color,'fill':fill,'x':x,'y':y,'sw':sw})
def circle(n,name,x,y,d,fill,stroke=None):
 n.append({'type':'ellipse','name':name,'x':x,'y':y,'w':d,'h':d,'fill':fill,'stroke':stroke})
def button(n,label,x,y,w=180,h=48,variant='primary',target=None):
 fill=C['green'] if variant=='primary' else ('#FFFFFF' if variant=='outline' else C['mint'])
 fg='#FFFFFF' if variant=='primary' else C['green']
 g=group(n,'Button / '+label,x,y,w,h,fill,12,C['green'] if variant=='outline' else None)
 n[-1].update({'component':'Button / '+variant,'target':target,'label':label})
 txt(g,label,8,(h-22)/2,w-16,15,fg,600,22,'center')
def chip(n,label,x,y,w,fill=None,fg=None):
 g=group(n,'Tag / '+label,x,y,w,28,fill or C['mint'],14)
 txt(g,label,8,6,w-16,11,fg or C['green'],600,16,'center')
def arrow(n,x,y,col=C['green']):
 path(n,'Arrow right','M 0 6 H 13 M 8 1 L 13 6 L 8 11',col,x,y,sw=1.8)
def header(n,w,active):
 m=w<600
 g=group(n,'Header',0,0,w,84 if m else 108,'#FFFFFF',0)
 img(g,'Original ECP emblem','quiz',[40,12,114,112],20 if m else 80,12 if m else 18,56 if m else 68,56 if m else 68)
 txt(g,'ELECTION COMMISSION\nOF PAKISTAN',88 if m else 162,18 if m else 24,240 if m else 375,13 if m else 18,C['forest'],700,18 if m else 23)
 if not m:txt(g,'Free, Fair, Transparent Elections',162,73,360,12,C['muted'],400,16)
 if m:
  path(g,'Menu','M 0 0 H 20 M 0 7 H 20 M 0 14 H 20',C['forest'],w-43,34)
 else:
  for label,x,key in [('Learn',813,'home'),('Quiz',920,'quiz'),('Voting game',1010,'game')]:
   txt(g,label,x,44,135,15,C['green'] if key==active else C['muted'],600 if key==active else 400,22)
   if key==active:rect(g,'Active page',x,78,40 if key!='game' else 85,3,C['green'],2)
  button(g,'Explore resources',1180,30,180,46,'primary','home-desktop')
 rect(n,'Header border',0,107 if not m else 83,w,1,C['line'])
def footer(n,w,y):
 m=w<600
 g=group(n,'Footer',0,y,w,174 if m else 202,C['forest'])
 path(g,'Soft green wave',f'M 0 0 Q {w*0.3} 45 {w*0.62} 5 T {w} 2 V 0 Z','#CDEBD8',fill='#CDEBD8',sw=0)
 if m:
  txt(g,'Your vote matters.',24,35,w-48,25,'#FFFFFF',700,34)
  txt(g,'Be informed. Be empowered.\nMake your vote count.',24,81,w-48,14,'#C8E4D7',400,22)
  txt(g,'VOTER EDUCATION',24,140,w-48,10,'#A3C9B6',600,14)
 else:
  txt(g,'Your vote matters.',80,53,600,34,'#FFFFFF',700,44)
  txt(g,'Be informed. Be empowered. Make your vote count.',80,112,780,16,'#CCE5D9',400,24)
  txt(g,'A STRONGER\nPAKISTAN TOGETHER',1090,65,270,18,'#FFFFFF',700,27,'right')
  txt(g,'VOTER EDUCATION',80,169,250,10,'#A3C9B6',600,14)

def resource(n,label,desc,asset,crop,x,y,w,h,tint,color,kind='small',target=None):
 g=group(n,'Resource / '+label,x,y,w,h,'#FFFFFF',20,C['line'])
 if kind=='wide':
  img(g,label+' original graphic',asset,crop,16,44,202,96,14)
  txt(g,label,242,28,w-266,22,C['ink'],700,28)
  txt(g,desc,242,72,w-266,14,C['muted'],400,21)
  txt(g,'Explore resource',242,h-40,210,14,color,600,20)
  arrow(g,w-38,h-35,color)
 else:
  rect(g,'Illustration background',1,1,w-2,148,tint,19)
  img(g,label+' original graphic',asset,crop,(w-256)/2,10,256,134,12)
  txt(g,label,24,170,w-48,23,C['ink'],700,30)
  txt(g,desc,24,211,w-48,15,C['muted'],400,22)
  txt(g,'Start the quiz' if 'Quiz'==label else ('Play the game' if 'Voting Game'==label else 'Watch videos'),24,h-48,w-78,14,color,600,22)
  arrow(g,w-44,h-42,color)
 n[-1]['target']=target

def home_desktop():
 n=frame('home-desktop','01 • Learn about voting / Desktop',1440,1624);header(n,1440,'home')
 g=group(n,'Hero',80,148,1280,424,C['mint'],26)
 chip(g,'YOUR VOTE. YOUR RIGHT. YOUR FUTURE.',40,32,319,'#D2EEDC',C['green'])
 txt(g,'Learn about\nvoting.',40,83,590,58,C['forest'],700,64)
 txt(g,'Understand your rights, discover official resources,\nand feel confident about the voting process.',40,229,590,17,C['muted'],400,26)
 button(g,'Take the quiz  →',40,309,190,50,'primary','quiz-desktop')
 button(g,'Play voting game',244,309,193,50,'outline','game-desktop')
 img(g,'Laptop, learning books and Pakistan slogan','home',[664,214,430,281],692,28,550,359,20)
 txt(g,'Know your rights   •   Be informed   •   Participate',40,382,590,13,C['green'],600,18)
 txt(n,'Explore voter resources',80,625,1020,32,C['forest'],700,42)
 txt(n,'Everything you need to learn, test your knowledge, and take the next step.',80,681,1100,16,C['muted'],400,24)
 resource(n,'ECP Official Website','Updates, notices, and information\nfrom the Election Commission.','home',[67,574,286,132],80,733,628,184,C['mint'],C['green'],'wide')
 resource(n,'General Knowledge','Learn about elections, voting rights,\nand the electoral process.','home',[66,721,286,113],732,733,628,184,C['paleBlue'],C['blue'],'wide')
 resource(n,'Quiz','Five questions. How well do you\nknow the voting process?','home',[67,846,274,125],80,941,410,320,C['palePurple'],C['purple'],target='quiz-desktop')
 resource(n,'Voting Game','Follow your voter journey, from\nleaving home to casting your vote.','home',[67,988,289,123],514,941,410,320,C['mint'],C['green'],target='game-desktop')
 resource(n,'Awareness Videos','Explore voting and election\neducation through video.','home',[66,1135,289,128],948,941,412,320,C['paleGold'],C['gold'])
 g=group(n,'Participation strip',80,1297,1280,84,'#EAF5ED',18)
 for x,title,desc in [(28,'Be informed','Know your voting rights'),(449,'Be empowered','Build your knowledge'),(871,'Make it count','Every vote matters')]:
  circle(g,'Check background',x,25,34,'#CDE8D6');txt(g,'✓',x,30,34,18,C['green'],700,24,'center')
  txt(g,title,x+50,17,310,18,C['forest'],700,25);txt(g,desc,x+50,47,310,13,C['muted'],400,18)
 footer(n,1440,1422)

def home_mobile():
 n=frame('home-mobile','01 • Learn about voting / Mobile',390,2020);header(n,390,'home')
 g=group(n,'Hero',16,104,358,574,C['mint'],22)
 txt(g,'YOUR VOTE. YOUR RIGHT.\nYOUR FUTURE.',24,24,310,10,C['green'],700,16)
 txt(g,'Learn about\nvoting.',24,78,310,42,C['forest'],700,48)
 txt(g,'Understand your rights and explore\nthe voting process with confidence.',24,192,310,15,C['muted'],400,23)
 button(g,'Take the quiz  →',24,261,310,48,'primary','quiz-mobile')
 button(g,'Play voting game',24,319,310,48,'outline','game-mobile')
 img(g,'Original laptop and learning books','home',[664,214,430,281],43,382,270,176,14)
 txt(n,'Explore voter\nresources',24,713,342,28,C['forest'],700,35)
 txt(n,'Learn, play, and make your vote count.',24,797,342,14,C['muted'],400,22)
 cards=[('ECP Official Website','Official updates and information.','home',[67,574,286,132],C['green'],C['mint'],None),('General Knowledge','Your guide to the\nelectoral process.','home',[66,721,286,113],C['blue'],C['paleBlue'],None),('Quiz','Test what you know\nabout voting.','home',[67,846,274,125],C['purple'],C['palePurple'],'quiz-mobile'),('Voting Game','Take your first step\non the journey.','home',[67,988,289,123],C['green'],C['mint'],'game-mobile'),('Awareness Videos','Learn through\nelection education.','home',[66,1135,289,128],C['gold'],C['paleGold'],None)]
 for i,(label,desc,asset,crop,color,bg,target) in enumerate(cards):
  g=group(n,'Resource / '+label,16,849+i*179,358,163,'#FFFFFF',18,C['line'])
  img(g,label+' original graphic',asset,crop,12,15,117,73,12)
  txt(g,label,143,22,196,15,C['ink'],700,23)
  txt(g,desc.replace(' and ',' and\n') if i==0 else desc,143,63,196,12,C['muted'],400,19)
  rect(g,'Divider',16,111,326,1,C['line'])
  txt(g,'Open resource' if i<2 else ('Start the quiz' if i==2 else 'Play the game' if i==3 else 'Watch videos'),18,127,290,13,color,600,18)
  arrow(g,318,130,color);n[-1]['target']=target
 footer(n,390,1846)

QUESTIONS=[
 ('Who can vote?',[76,575,158,72],['Only government\nemployees','All registered citizens\n(18 years and above)','Only people with\na driving license'],C['green'],C['mint']),
 ('What documents are required?',[72,705,177,132],['CNIC (Computerized\nNational Identity Card)','Passport only','Student ID card only'],C['blue'],C['paleBlue']),
 ('Where do you cast your vote?',[72,881,176,123],['At your assigned\npolling station','At your school\nonly','At your district\nheadquarters'],C['purple'],C['palePurple']),
 ('What happens at the polling station?',[71,1052,179,130],['You just show your ID\nand leave','You receive a ballot,\nmark it, and cast your vote','You fill out a form\nand go home'],C['blue'],C['paleBlue']),
 ('What is the purpose of the ballot paper?',[73,1225,178,123],['To register your name','To mark your preferred\ncandidate or party','To get a voter ID card'],C['purple'],C['palePurple'])
]
def option(n,label,x,y,w,h=65,selected=False):
 g=group(n,'Answer / '+label.replace('\n',' '),x,y,w,h,'#E3F3EA' if selected else '#FFFFFF',12,C['green'] if selected else '#D1DFDC')
 circle(g,'Radio',16,(h-20)/2,20,'#FFFFFF',C['green'] if selected else '#738B82')
 if selected:circle(g,'Radio selected',21,(h-10)/2,10,C['green'])
 lines=len(label.split('\n'));txt(g,label,49,(h-lines*20)/2,w-59,14,C['ink'],400,20)
 n[-1]['component']='Answer / '+('selected' if selected else 'default')
def quiz_desktop():
 n=frame('quiz-desktop','02 • Voter awareness quiz / Desktop',1440,1816);header(n,1440,'quiz')
 g=group(n,'Quiz hero',80,148,1280,292,'#E9F6F1',26)
 chip(g,'VOTER AWARENESS QUIZ',36,28,223)
 txt(g,'How well do you\nknow your vote?',36,80,620,44,C['forest'],700,51)
 txt(g,'Answer five questions and put your knowledge to the test.',36,211,650,16,C['muted'],400,25)
 img(g,'Original quiz character and ballot box','quiz',[531,144,583,306],687,0,593,292,25)
 g=group(n,'Quiz progress',80,472,1280,74,'#FFFFFF',16,C['line'])
 txt(g,'Your progress',24,16,220,14,C['ink'],600,20)
 txt(g,'0 of 5 answered',24,42,220,12,C['muted'],400,18)
 rect(g,'Progress track',284,32,728,10,'#E4ECE8',5)
 chip(g,'5 QUESTIONS',1060,23,190,C['mint'],C['green'])
 for i,(title,crop,opts,color,tint) in enumerate(QUESTIONS):
  g=group(n,'Question '+str(i+1),80,578+i*182,1280,166,'#FFFFFF',20,C['line'])
  rect(g,'Question tint',1,1,211,164,tint,19)
  img(g,'Original question illustration','quiz',crop,36,21,143,126,16)
  circle(g,'Number badge',15,14,32,color);txt(g,str(i+1),15,18,32,17,'#FFFFFF',700,24,'center')
  txt(g,title,241,22,999,23,C['ink'],700,31)
  for j,o in enumerate(opts):option(g,o,241+j*335,74,317,68)
 txt(n,'Choose one answer for each question.',80,1522,730,14,C['muted'],400,22)
 button(n,'Check my answers  →',1098,1503,262,52)
 footer(n,1440,1614)

def quiz_mobile():
 n=frame('quiz-mobile','02 • Voter awareness quiz / Mobile',390,1530);header(n,390,'quiz')
 g=group(n,'Quiz hero',16,104,358,382,'#E9F6F1',22)
 chip(g,'VOTER AWARENESS QUIZ',24,22,224)
 txt(g,'How well do you\nknow your vote?',24,73,314,32,C['forest'],700,39)
 txt(g,'Five questions to test your knowledge.',24,168,311,14,C['muted'],400,22)
 img(g,'Original quiz character and ballot box','quiz',[531,144,583,306],16,211,326,171,16)
 txt(n,'Question 1 of 5',24,516,240,15,C['ink'],600,22)
 txt(n,'0 answered',249,520,117,12,C['muted'],400,18,'right')
 rect(n,'Progress track',24,555,342,8,'#DFEAE4',4);rect(n,'Current question marker',24,555,68,8,C['green'],4)
 g=group(n,'Question 1 / Active',16,587,358,445,'#FFFFFF',20,C['line'])
 img(g,'Original voters illustration','quiz',QUESTIONS[0][1],115,22,128,88,14)
 txt(g,'Who can vote?',24,132,310,25,C['ink'],700,34,'center')
 for i,o in enumerate(QUESTIONS[0][2]):option(g,o,20,189+i*75,318,63)
 button(n,'Next question  →',24,1056,342,50)
 txt(n,'Answer a question to continue.',24,1121,342,12,C['muted'],400,18,'center')
 g=group(n,'Question navigation',16,1171,358,134,C['mint'],18)
 txt(g,'Your quiz',20,17,318,15,C['forest'],600,22)
 for i in range(5):
  circle(g,'Question '+str(i+1),21+i*64,61,44,C['green'] if i==0 else '#FFFFFF',None if i==0 else C['line'])
  txt(g,str(i+1),21+i*64,70,44,16,'#FFFFFF' if i==0 else C['muted'],600,24,'center')
 footer(n,390,1356)

STEPS=[
 ('Leaving home',[25,379,238,167],'Bring your CNIC and voter information.','Before going to vote, what should\nyou make sure you have?',['CNIC and voter information','Your driving license','Your school certificate'],C['green'],C['mint']),
 ('Find polling station',[305,383,236,165],'Know where you will cast your vote.','Where should you go to cast\nyour vote?',['Your assigned polling station','Government office','Police station'],C['blue'],C['paleBlue']),
 ('Identification',[584,380,234,171],'Have your identity checked.','Which document is used for\nvoter identification?',['CNIC','Driving license','School ID card'],C['purple'],C['palePurple']),
 ('Ballot paper',[857,365,248,191],'Mark your choice on the ballot.','What should you do after receiving\nthe ballot paper?',['Mark your choice correctly','Show it to others','Keep it with you'], '#CA611C','#FFF0E3'),
 ('Casting your vote',[25,875,237,199],'Place your ballot in the ballot box.','Mark your choice and place the\nballot paper in the ballot box.',['True','False'], '#B83E47','#FAECEF'),
 ('Vote cast',[307,875,233,198],'Be proud and stay informed.','What matters after casting\nyour vote?',['Be proud and informed','Leave without checking','Tell others who you voted for'], '#007C84','#E3F3F3'),
 ('The complete journey',[585,882,230,394],'From home to a better tomorrow.','',['Review the journey'], '#4C5EAA','#EEF0FC'),
 ('Congratulations!',[855,867,250,212],'You have completed your voting journey.','',['An informed voter strengthens democracy.'],C['purple'],C['palePurple'])
]
def game_desktop():
 n=frame('game-desktop','03 • Your voting journey / Desktop',1440,1840);header(n,1440,'game')
 g=group(n,'Game hero',80,148,1280,300,'#E7F4EE',26)
 img(g,'Original voting journey banner','game',[0,0,1125,280],0,0,1280,300,26)
 g=group(n,'Game introduction',80,480,1280,78)
 txt(g,'Your voting journey',0,2,950,32,C['forest'],700,42)
 txt(g,'Learn by playing. Follow eight steps, from your front door to the ballot box.',0,50,960,15,C['muted'],400,22)
 button(g,'Start journey  →',1048,12,232,50)
 for i,(title,crop,desc,question,opts,color,tint) in enumerate(STEPS):
  x=80+(i%4)*326;y=594+(i//4)*491
  g=group(n,'Journey step '+str(i+1)+' / '+title,x,y,302,467,'#FFFFFF',20,C['line'])
  img(g,'Original step artwork','game',crop,12,12,278,186,14)
  circle(g,'Step number',22,22,36,color);txt(g,str(i+1),22,27,36,18,'#FFFFFF',700,25,'center')
  txt(g,title,20,218,262,19,C['ink'],700,26)
  if i<6:
   txt(g,question,20,262,262,13,C['muted'],400,20)
   for j,o in enumerate(opts):
    yy=325+j*37
    rect(g,'Answer '+str(j+1),16,yy,270,31,tint if j==0 else '#F8FAF8',8)
    txt(g,chr(65+j),23,yy+7,24,11,color,700,16)
    txt(g,o,47,yy+6,225,11,C['ink'],400,17)
  elif i==6:
   txt(g,'See how every step connects\non your way to a better tomorrow.',20,264,262,14,C['muted'],400,22)
   button(g,'Explore the journey',20,371,262,48,'outline')
  else:
   txt(g,'You have completed your\nvoting journey.',20,266,262,16,C['muted'],400,24)
   rect(g,'Empowerment message',20,341,262,98,tint,12)
   txt(g,'An informed voter\nstrengthens democracy.',32,363,238,16,color,600,24,'center')
 footer(n,1440,1638)

def game_mobile():
 n=frame('game-mobile','03 • Your voting journey / Mobile',390,2095);header(n,390,'game')
 g=group(n,'Game hero',16,104,358,267,'#E7F4EE',22)
 chip(g,'A VOTING AWARENESS GAME',20,20,261)
 txt(g,'Your vote.\nYour journey.',20,72,318,35,C['forest'],700,42)
 txt(g,'Learn. Play. Make a difference.',20,181,318,14,C['muted'],400,22)
 txt(g,'8 STEPS TO A MORE INFORMED YOU',20,224,318,10,C['green'],700,16)
 txt(n,'Step 1 of 8',24,397,262,14,C['ink'],600,20)
 rect(n,'Journey progress track',24,430,342,8,'#DFEAE4',4);rect(n,'Journey progress',24,430,42.75,8,C['green'],4)
 g=group(n,'Active stage / Leaving home',16,462,358,536,'#FFFFFF',20,C['line'])
 img(g,'Original leaving home illustration','game',STEPS[0][1],12,12,334,235,14)
 chip(g,'STEP 01',26,27,80,C['green'],'#FFFFFF')
 txt(g,'Leaving home',20,268,318,26,C['forest'],700,34)
 txt(g,'Before going to vote, what should\nyou make sure you have?',20,316,318,15,C['muted'],400,23)
 for i,o in enumerate(STEPS[0][4]):option(g,o,18,380+i*47,322,41)
 button(n,'Check answer  →',24,1022,342,50)
 txt(n,'Your journey',24,1110,342,24,C['forest'],700,32)
 for i,(title,crop,desc,q,opts,col,tint) in enumerate(STEPS):
  yy=1168+i*91
  g=group(n,'Journey map / '+title,16,yy,358,79,C['mint'] if i==0 else '#FFFFFF',14,C['line'])
  img(g,'Original step '+str(i+1)+' illustration','game',crop,10,9,74,61,10)
  txt(g,str(i+1).zfill(2),98,12,24,11,col,700,16)
  txt(g,title,130,12,208,14,C['ink'],600,21)
  txt(g,'Current step' if i==0 else ('Journey complete' if i==7 else 'Up next'),98,45,240,12,C['muted'],400,18)
 footer(n,390,1921)

def styleguide():
 n=frame('design-system','04 • Design system & reusable components',1440,1080)
 txt(n,'Voter education / Design system',64,56,1300,38,C['forest'],700,49)
 txt(n,'Original illustrations · Editable interface · Desktop 1440 px · Mobile 390 px',64,123,1300,17,C['muted'],400,26)
 txt(n,'Color palette',64,189,650,24,C['forest'],700,32)
 colors=[('ECP green',C['green']),('Forest',C['forest']),('Knowledge blue',C['blue']),('Quiz purple',C['purple']),('Video gold',C['gold']),('Canvas',C['bg'])]
 for i,(name,col) in enumerate(colors):
  x=64+i*220;rect(n,name,x,243,196,90,col,14,C['line'] if i==5 else None);txt(n,name,x,349,196,15,C['ink'],600,22);txt(n,col,x,379,196,13,C['muted'],400,20)
 txt(n,'Typography / Inter',64,457,700,24,C['forest'],700,32)
 txt(n,'A more informed voter.',64,508,840,40,C['forest'],700,52)
 txt(n,'Clear information, thoughtful spacing.',64,581,800,24,C['ink'],600,33)
 txt(n,'Body / 16 px · 24 px line height     Labels / 14 px · 20 px',64,635,820,16,C['muted'],400,24)
 txt(n,'Buttons',959,457,400,24,C['forest'],700,32)
 button(n,'Get started  →',959,510,342,50)
 button(n,'Explore resources',959,578,342,50,'outline')
 button(n,'Back to learning',959,646,342,50,'soft')
 txt(n,'Answer options',64,744,750,24,C['forest'],700,32)
 option(n,'Default answer option',64,798,622,74)
 option(n,'Selected answer option',712,798,622,74,True)
 txt(n,'Layout & artwork',64,925,700,22,C['forest'],700,30)
 txt(n,'Desktop: 80 px margins, 24 px gutters. Mobile: 16–24 px margins.\nIllustrations remain the supplied JPEG artwork; interface labels and controls are separate layers.',64,972,1280,15,C['muted'],400,24)

home_desktop();home_mobile();quiz_desktop();quiz_mobile();game_desktop();game_mobile();styleguide()
DATA={'title':'ECP Voter Education Website','colors':C,'assets':ASSETS,'frames':F}
(ROOT/'source/design-data.json').write_text(json.dumps(DATA,ensure_ascii=False,separators=(',',':')))

# Render exactly the same scene descriptions to portable SVG and native Figma layers.
def esc(s):return html.escape(str(s),quote=True)
def render_svg(f):
 defs=[];used=set();counter=[0]
 def nodes(ns):
  out=[]
  for a in ns:
   t=a['type'];x=a.get('x',0);y=a.get('y',0);w=a.get('w',0);h=a.get('h',0);r=a.get('r',0)
   name=f'<title>{esc(a["name"])}</title>'
   stroke=f' stroke="{a["stroke"]}" stroke-width="1"' if a.get('stroke') else ''
   if t=='group':
    out.append(f'<g transform="translate({x} {y})">{name}')
    if a.get('fill') or a.get('stroke'):out.append(f'<rect x="0.5" y="0.5" width="{w-1}" height="{h-1}" rx="{r}" fill="{a.get("fill","none")}"{stroke}/>')
    out.append(nodes(a['children']));out.append('</g>')
   elif t in ['rect','ellipse']:
    if t=='rect':out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{a["fill"]}"{stroke}>{name}</rect>')
    else:out.append(f'<ellipse cx="{x+w/2}" cy="{y+h/2}" rx="{w/2}" ry="{h/2}" fill="{a["fill"]}"{stroke}>{name}</ellipse>')
   elif t=='text':
    anchor={'left':'start','center':'middle','right':'end'}[a['align']];tx=x+(0 if anchor=='start' else w/2 if anchor=='middle' else w)
    out.append(f'<text x="{tx}" y="{y+a["size"]*0.96}" font-family="Inter, DejaVu Sans, Arial, sans-serif" font-size="{a["size"]}" font-weight="{a["weight"]}" fill="{a["fill"]}" text-anchor="{anchor}">{name}')
    for j,line in enumerate(a['text'].split('\n')):out.append(f'<tspan x="{tx}" dy="{0 if j==0 else a["lh"]}">{esc(line)}</tspan>')
    out.append('</text>')
   elif t=='path':out.append(f'<path transform="translate({x} {y})" d="{a["d"]}" fill="{a["fill"]}" stroke="{a["stroke"]}" stroke-width="{a["sw"]}" stroke-linecap="round" stroke-linejoin="round">{name}</path>')
   elif t=='image':
    asset=ASSETS[a['asset']];used.add(a['asset']);cx,cy,cw,ch=a['crop'];s=max(w/cw,h/ch);ox=x-cx*s-(cw*s-w)/2;oy=y-cy*s-(ch*s-h)/2
    cid='clip'+str(counter[0]);counter[0]+=1;defs.append(f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/></clipPath>')
    out.append(f'<g clip-path="url(#{cid})">{name}<use href="#asset-{a["asset"]}" xlink:href="#asset-{a["asset"]}" transform="translate({ox} {oy}) scale({s})"/></g>')
  return ''.join(out)
 body=nodes(f['nodes'])
 for aid in sorted(used):
  a=ASSETS[aid];defs.append(f'<image id="asset-{aid}" width="{a["w"]}" height="{a["h"]}" href="data:image/jpeg;base64,{a["base64"]}" xlink:href="data:image/jpeg;base64,{a["base64"]}"/>')
 return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{f["w"]}" height="{f["h"]}" viewBox="0 0 {f["w"]} {f["h"]}"><title>{esc(f["name"])}</title><defs>{"".join(defs)}</defs><rect width="100%" height="100%" fill="{f["bg"]}"/>{body}</svg>'
for f in F:(ROOT/'svg'/f'{f["id"]}.svg').write_text(render_svg(f))
print('Created',len(F),'editable scene descriptions and SVG layouts')
