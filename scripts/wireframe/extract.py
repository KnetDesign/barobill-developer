# 화면설계서 HTML → 페이지(id="p-*")별 텍스트 추출. 사용: python3 -I scripts/wireframe/extract.py <index.html> <outdir>
import sys,re
import os
OUT=sys.argv[2] if len(sys.argv)>2 else 'wf'
os.makedirs(OUT,exist_ok=True)
from html.parser import HTMLParser
src=open(sys.argv[1],encoding='utf-8').read()
# strip script/style
src=re.sub(r'<(script|style)[^>]*>.*?</\1>','',src,flags=re.S)
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.out=[]; s.cur='_pre'
        s.pages={'_pre':[]}
    def handle_starttag(s,t,a):
        d=dict(a)
        if d.get('id','').startswith('p-'):
            s.cur=d['id']; s.pages.setdefault(s.cur,[])
        if t in('h1','h2','h3','h4','h5','p','li','div','tr','section','br','td','th','button','a'):
            s.pages[s.cur].append('\n')
        if t in ('h1','h2','h3','h4'): s.pages[s.cur].append('#'*int(t[1])+' ')
    def handle_data(s,d):
        d=d.strip()
        if d: s.pages[s.cur].append(d+' ')
p=P(); p.feed(src)
for k,v in p.pages.items():
    txt=re.sub(r'\n\s*\n+','\n',''.join(v))
    open(f'{OUT}/{k}.txt','w').write(txt)
    print(k,len(txt))
