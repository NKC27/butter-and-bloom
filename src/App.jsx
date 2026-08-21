import React, { useState, useMemo, useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════
   BUTTER & BLOOM — Private Cake Commissions, Bodicote
   Direction: the hand-coloured botanical plate. Blush plaster
   ground, aubergine ink, botanical green and antique gilt.
   Cormorant Garamond / Lora / Jost. Ornament is drawn, not
   borrowed: vine rules, corner flourishes, fleurons, damask.
   ══════════════════════════════════════════════════════════════ */

const DAMASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130'%3E%3Cg fill='none' stroke='%234E6B4F' stroke-width='.9'%3E%3Cellipse cx='65' cy='51' rx='7.5' ry='14'/%3E%3Cellipse cx='65' cy='79' rx='7.5' ry='14'/%3E%3Cellipse cx='51' cy='65' rx='14' ry='7.5'/%3E%3Cellipse cx='79' cy='65' rx='14' ry='7.5'/%3E%3Ccircle cx='65' cy='65' r='4'/%3E%3Cpath d='M0 0q12 14 26 17M130 0q-12 14-26 17M0 130q12-14 26-17M130 130q-12-14-26-17'/%3E%3C/g%3E%3C/svg%3E\")";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');

.mm {
  --ground:    #F5EFF1;
  --ground-2:  #EDE2E6;
  --linen:     #FBF7F8;
  --ink:       #3D2B33;
  --ink-72:    rgba(61,43,51,.72);
  --ink-50:    rgba(61,43,51,.50);
  --ink-28:    rgba(61,43,51,.28);
  --verdant:   #4E6B4F;
  --verdant-40:rgba(78,107,79,.40);
  --verdant-18:rgba(78,107,79,.18);
  --rose:      #B96A78;
  --gilt:      #B08D4F;
  --gilt-30:   rgba(176,141,79,.30);

  --disp: 'Cormorant Garamond', Garamond, Georgia, serif;
  --body: 'Lora', Georgia, serif;
  --util: 'Jost', system-ui, sans-serif;

  background: var(--ground);
  color: var(--ink);
  font-family: var(--body);
  font-weight: 400;
  font-size: 15.5px;
  line-height: 1.85;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.mm *, .mm *::before, .mm *::after { box-sizing: border-box; }
.mm button { font: inherit; color: inherit; background: none; border: none; cursor: pointer; padding: 0; }
.mm input, .mm select, .mm textarea { font: inherit; color: inherit; }
.mm a { color: inherit; text-decoration: none; }
.mm :focus-visible { outline: 1px solid var(--rose); outline-offset: 4px; }
.mm ::selection { background: var(--rose); color: var(--linen); }

.mm-damask { position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: .06; background-image: ${DAMASK}; }

/* ─── type ─── */
.mm-d { font-family: var(--disp); font-weight: 300; line-height: 1.04; letter-spacing: .002em; }
.mm-d em { font-style: italic; color: var(--rose); }
.mm-sc { font-family: var(--util); font-weight: 400; font-size: 10px; letter-spacing: .34em; text-transform: uppercase; }
.mm-sc-sm { font-family: var(--util); font-weight: 400; font-size: 9px; letter-spacing: .26em; text-transform: uppercase; }
.mm h1,.mm h2,.mm h3,.mm h4 { margin: 0; font-weight: 300; }
.mm p { margin: 0; }
.mm-lede { font-size: 16px; line-height: 1.95; color: var(--ink-72); }

/* ─── shell ─── */
.mm-wrap { max-width: 1280px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 2; }
.mm-sec { padding: 130px 0; position: relative; }
.mm-panel { background: var(--ground-2); }

.mm-rev { opacity: 0; transform: translateY(24px); transition: opacity 1.05s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1); }
.mm-rev[data-in="true"] { opacity: 1; transform: none; }

/* section heading with fleuron */
.mm-head { text-align: center; margin-bottom: 66px; }
.mm-head .no { color: var(--gilt); display: block; margin-bottom: 14px; }
.mm-head h2 { font-family: var(--disp); font-size: clamp(34px, 4.4vw, 56px); font-weight: 300; }
.mm-head .r { display: block; margin-top: 16px; color: var(--ink-50); }

/* ─── nav ─── */
.mm-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 80; transition: background .5s ease, box-shadow .5s ease; }
.mm-nav[data-solid="true"] { background: rgba(245,239,241,.94); backdrop-filter: blur(16px); box-shadow: 0 1px 0 var(--verdant-18); }
.mm-nav-in { max-width: 1280px; margin: 0 auto; padding: 0 40px; height: 136px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; position: relative; }
.mm-nav .mm-mark { z-index: 2; padding: 7px 34px 8px; background: var(--ground); border-top: 1px solid var(--gilt-30); border-bottom: 1px solid var(--gilt-30); text-align: center; white-space: nowrap; }
.mm-mark b { display: block; font-family: var(--disp); font-size: 25px; font-weight: 400; letter-spacing: .26em; }
.mm-mark span { display: block; font-family: var(--util); font-size: 8px; letter-spacing: .4em; text-transform: uppercase; color: var(--verdant); margin-top: 4px; }
.mm-links { display: flex; gap: 28px; margin-left: 0; align-items: center; justify-content: center; flex-wrap: wrap; }
.mm-link { position: relative; padding: 5px 0; color: var(--ink-72); transition: color .4s ease; }
.mm-link::after { content: ''; position: absolute; left: 50%; right: 50%; bottom: 0; height: 1px; background: var(--rose); transition: left .45s cubic-bezier(.16,1,.3,1), right .45s cubic-bezier(.16,1,.3,1); }
.mm-link:hover { color: var(--ink); }
.mm-link:hover::after { left: 0; right: 0; }
.mm-burger { display: none; margin-left: auto; }

/* ─── buttons ─── */
.mm-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  padding: 16px 32px; border: 1px solid var(--verdant-40); color: var(--verdant);
  font-family: var(--util); font-size: 10px; letter-spacing: .28em; text-transform: uppercase;
  position: relative; overflow: hidden; transition: color .5s ease, border-color .5s ease; background: transparent;
}
.mm-btn::before { content: ''; position: absolute; inset: 0; background: var(--verdant); transform: scaleY(0); transform-origin: bottom; transition: transform .5s cubic-bezier(.16,1,.3,1); }
.mm-btn:hover { color: var(--linen); border-color: var(--verdant); }
.mm-btn:hover::before { transform: scaleY(1); }
.mm-btn > * { position: relative; z-index: 2; }
.mm-btn[disabled] { opacity: .35; pointer-events: none; }
.mm-btn-rose { background: var(--rose); border-color: var(--rose); color: var(--linen); }
.mm-btn-rose::before { background: var(--ink); }
.mm-btn-rose:hover { border-color: var(--ink); color: var(--linen); }
.mm-btn-sm { padding: 10px 18px; font-size: 9px; letter-spacing: .2em; }

/* ─── hero ─── */
.mm-hero { padding: 156px 0 100px; position: relative; }
.mm-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 66px; align-items: center; }
.mm-hero h1 { font-family: var(--disp); font-size: clamp(50px, 7vw, 104px); font-weight: 300; line-height: .98; }
.mm-hero h1 .il { display: block; font-style: italic; color: var(--rose); }
.mm-hero-branch { position: absolute; top: 60px; right: -40px; width: 460px; opacity: .16; pointer-events: none; z-index: 0; }
.mm-hero-meta { display: flex; justify-content: space-between; gap: 22px; flex-wrap: wrap; margin-top: 80px; padding-top: 24px; border-top: 1px solid var(--verdant-18); color: var(--ink-50); }

/* ─── ornamented plate ─── */
.mm-plate { background: var(--linen); border: 1px solid var(--verdant-18); position: relative; box-shadow: 0 20px 50px -34px rgba(61,43,51,.42); }
.mm-plate-cap { padding: 14px 20px; border-top: 1px solid var(--verdant-18); display: flex; justify-content: space-between; gap: 14px; color: var(--ink-50); }
.mm-cart { position: relative; padding: 22px; }
.mm-cart > svg.fl { position: absolute; width: 62px; height: 62px; color: var(--gilt); opacity: .85; }
.mm-cart > svg.tl { top: 0; left: 0; }
.mm-cart > svg.tr { top: 0; right: 0; transform: scaleX(-1); }
.mm-cart > svg.bl { bottom: 0; left: 0; transform: scaleY(-1); }
.mm-cart > svg.br { bottom: 0; right: 0; transform: scale(-1); }

@keyframes mm-dash { to { stroke-dashoffset: 0 } }
.mm-anim { stroke-dasharray: 1700; stroke-dashoffset: 1700; animation: mm-dash 2.8s cubic-bezier(.4,0,.15,1) forwards; }

/* ─── band ─── */
.mm-band { display: grid; grid-template-columns: repeat(4, 1fr); }
.mm-band > div { padding: 46px 28px; border-right: 1px solid var(--verdant-18); text-align: center; }
.mm-band > div:last-child { border-right: none; }
.mm-band b { display: block; font-family: var(--disp); font-size: 42px; font-weight: 300; color: var(--verdant); }
.mm-band span { display: block; margin-top: 10px; color: var(--ink-50); }

/* ─── manifesto ─── */
.mm-manifesto { max-width: 900px; margin: 0 auto; text-align: center; }
.mm-manifesto p { font-family: var(--disp); font-size: clamp(25px, 3.2vw, 42px); line-height: 1.4; font-weight: 300; }
.mm-drop::first-letter { font-family: var(--disp); font-size: 3.1em; line-height: .8; float: left; margin: .09em .09em 0 0; color: var(--rose); font-weight: 400; }

/* ─── collections ─── */
.mm-coll { display: grid; grid-template-columns: 440px 1fr; gap: 66px; align-items: center; padding: 66px 0; }
.mm-coll[data-flip="true"] { grid-template-columns: 1fr 440px; }
.mm-coll[data-flip="true"] .mm-coll-art { order: 2; }
.mm-coll h3 { font-family: var(--disp); font-size: clamp(34px, 4.2vw, 56px); font-weight: 300; margin: 12px 0 20px; }
.mm-pieces { display: flex; flex-wrap: wrap; margin-top: 32px; border-top: 1px solid var(--verdant-18); }
.mm-piece { flex: 1 1 170px; padding: 18px 22px 18px 0; border-right: 1px solid var(--verdant-18); }
.mm-piece:last-child { border-right: none; }
.mm-piece b { display: block; font-family: var(--disp); font-size: 21px; font-weight: 400; }
.mm-piece span { display: block; color: var(--ink-50); margin-top: 4px; }
.mm-coll-art { cursor: pointer; }

/* ─── commission ─── */
.mm-steps { display: flex; gap: 0; margin-bottom: 40px; border-top: 1px solid var(--verdant-18); border-bottom: 1px solid var(--verdant-18); }
.mm-stepbtn { flex: 1; padding: 18px 14px; text-align: left; border-right: 1px solid var(--verdant-18); color: var(--ink-50); transition: background .35s ease, color .35s ease; position: relative; }
.mm-stepbtn:last-child { border-right: none; }
.mm-stepbtn:hover { color: var(--ink); }
.mm-stepbtn[data-on="true"] { background: var(--linen); color: var(--ink); }
.mm-stepbtn[data-on="true"]::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--rose); }
.mm-stepbtn .num { display: block; font-family: var(--disp); font-size: 26px; color: var(--rose); line-height: 1; margin-bottom: 6px; }
.mm-stepnav { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-top: 34px; }
.mm-choice { color: var(--ink-50); }
@media (max-width: 700px) { .mm-steps { flex-wrap: wrap; } .mm-stepbtn { flex: 1 1 50%; border-bottom: 1px solid var(--verdant-18); } }
.mm-build { display: grid; grid-template-columns: 1fr 470px; gap: 74px; align-items: start; }
.mm-group { padding: 34px 0; border-bottom: 1px solid var(--verdant-18); }
.mm-group:first-child { padding-top: 0; }
.mm-group-head { display: flex; align-items: baseline; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
.mm-group-head h3 { font-family: var(--disp); font-size: 30px; font-weight: 400; }
.mm-group-head .h { color: var(--ink-50); }

.mm-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 0 44px; }
.mm-opt {
  display: flex; align-items: baseline; gap: 13px; width: 100%; text-align: left;
  padding: 13px 0; border-bottom: 1px solid var(--verdant-18); color: var(--ink-72);
  transition: color .35s ease, padding-left .35s cubic-bezier(.16,1,.3,1);
}
.mm-opt:hover { color: var(--ink); padding-left: 8px; }
.mm-opt .mk { width: 13px; height: 13px; flex: none; position: relative; top: 2px; color: var(--verdant-40); transition: color .35s ease, transform .45s cubic-bezier(.16,1,.3,1); }
.mm-opt[data-on="true"] { color: var(--ink); }
.mm-opt[data-on="true"] .mk { color: var(--rose); transform: rotate(45deg) scale(1.15); }
.mm-opt .nm { flex: 1; font-size: 15px; }
.mm-opt .sub { display: block; color: var(--ink-50); font-size: 12.5px; font-style: italic; }
.mm-opt .pr { font-family: var(--util); font-size: 10.5px; letter-spacing: .1em; color: var(--ink-50); white-space: nowrap; }

.mm-inline { display: flex; flex-wrap: wrap; gap: 28px; }
.mm-tab { padding-bottom: 7px; border-bottom: 1px solid transparent; color: var(--ink-50); transition: color .35s ease, border-color .35s ease; }
.mm-tab[data-on="true"] { color: var(--rose); border-bottom-color: var(--rose); }
.mm-tab:hover { color: var(--ink); }

.mm-tierrow { display: flex; align-items: center; gap: 18px; padding: 12px 0; border-bottom: 1px solid var(--verdant-18); }
.mm-tierrow > label { color: var(--verdant); width: 86px; flex: none; }
.mm-native { flex: 1; background: transparent; border: none; border-bottom: 1px solid var(--verdant-18); padding: 8px 0; font-size: 15px; font-family: var(--body); }

.mm-swatches { display: flex; gap: 15px; flex-wrap: wrap; }
.mm-sw { width: 46px; height: 46px; border-radius: 50%; position: relative; transition: transform .45s cubic-bezier(.16,1,.3,1); }
.mm-sw i { position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(61,43,51,.16); }
.mm-sw:hover { transform: scale(1.09); }
.mm-sw[data-on="true"]::after { content: ''; position: absolute; inset: -8px; border-radius: 50%; border: 1px solid var(--rose); }

.mm-in { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--verdant-18); padding: 11px 0; font-size: 15px; font-family: var(--body); }
.mm-in:focus { border-bottom-color: var(--rose); outline: none; }
.mm-in::placeholder { color: var(--ink-28); font-style: italic; }
.mm-lbl { display: block; color: var(--verdant); margin-bottom: 3px; }

/* dossier */
.mm-dossier { position: sticky; top: 112px; }
.mm-doss-body { padding: 26px 26px 30px; }
.mm-row { display: flex; justify-content: space-between; gap: 18px; padding: 10px 0; border-bottom: 1px solid var(--verdant-18); }
.mm-row .k { color: var(--verdant); flex: none; padding-top: 4px; }
.mm-row .v { text-align: right; font-size: 14px; color: var(--ink-72); }
.mm-invest { padding-top: 24px; margin-top: 16px; border-top: 1px solid var(--gilt-30); text-align: center; }
.mm-invest b { display: block; font-family: var(--disp); font-size: 54px; font-weight: 300; color: var(--rose); line-height: 1; margin: 10px 0 8px; }

/* ─── clients ─── */
.mm-client { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.mm-client > figure { margin: 0; padding: 42px 34px; background: var(--linen); border: 1px solid var(--verdant-18); display: flex; flex-direction: column; position: relative; }
.mm-client blockquote { margin: 0; font-family: var(--disp); font-size: 23px; line-height: 1.45; font-style: italic; }
.mm-client footer { margin-top: auto; padding-top: 26px; color: var(--ink-50); }

/* ─── venues ─── */
.mm-venues { display: flex; flex-wrap: wrap; border-top: 1px solid var(--verdant-18); border-bottom: 1px solid var(--verdant-18); }
.mm-venues > div { flex: 1 1 190px; padding: 32px 22px; border-right: 1px solid var(--verdant-18); text-align: center; font-family: var(--disp); font-size: 19px; color: var(--ink-72); }
.mm-venues > div:last-child { border-right: none; }

/* ─── calendar ─── */
.mm-cal { border: 1px solid var(--verdant-18); padding: 30px; background: var(--linen); }
.mm-cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.mm-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.mm-dow { text-align: center; color: var(--verdant); padding-bottom: 10px; }
.mm-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; position: relative; font-size: 14px; border: 1px solid transparent; border-radius: 50%; transition: all .3s ease; color: var(--ink-72); }
.mm-day[data-state="open"]:hover { border-color: var(--rose); color: var(--ink); }
.mm-day[data-state="closed"], .mm-day[data-state="taken"] { color: var(--ink-28); pointer-events: none; }
.mm-day[data-state="taken"]::after { content: ''; position: absolute; width: 13px; height: 1px; background: var(--ink-28); }
.mm-day[data-on="true"] { background: var(--rose); color: var(--linen); border-color: var(--rose); }
.mm-day .dot { position: absolute; bottom: 5px; width: 3px; height: 3px; background: var(--verdant); border-radius: 50%; }
.mm-legend { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--verdant-18); color: var(--ink-50); }
.mm-legend span { display: inline-flex; align-items: center; gap: 8px; }
.mm-timeline { display: flex; height: 46px; border: 1px solid var(--verdant-18); margin: 28px 0; background: var(--linen); }
.mm-timeline > div { display: flex; align-items: center; justify-content: center; border-right: 1px solid var(--verdant-18); }
.mm-timeline > div:last-child { border-right: none; }

/* ─── modal ─── */
.mm-bg { position: fixed; inset: 0; background: rgba(61,43,51,.42); backdrop-filter: blur(8px); z-index: 130; display: flex; align-items: center; justify-content: center; padding: 24px; animation: mm-fade .45s ease both; }
@keyframes mm-fade { from { opacity: 0 } to { opacity: 1 } }
.mm-modal { background: var(--ground); border: 1px solid var(--verdant-40); width: 100%; max-width: 560px; max-height: 92vh; overflow: auto; box-shadow: 0 40px 90px -50px rgba(61,43,51,.6); }
.mm-modal-lg { max-width: 940px; }
.mm-modal-head { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; border-bottom: 1px solid var(--verdant-18); position: sticky; top: 0; background: var(--ground); z-index: 3; }
.mm-modal-body { padding: 32px; }
.mm-stack > * + * { margin-top: 22px; }
.mm-aside { padding: 16px 20px; border-left: 2px solid var(--gilt); background: rgba(176,141,79,.07); color: var(--ink-72); font-size: 13.5px; line-height: 1.8; }

/* ─── footer ─── */
.mm-foot { background: var(--ground-2); padding: 96px 0 40px; position: relative; z-index: 2; }
.mm-foot-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 50px; }
.mm-foot h4 { color: var(--verdant); margin-bottom: 20px; }
.mm-foot ul { margin: 0; padding: 0; list-style: none; }
.mm-foot li { margin-bottom: 11px; color: var(--ink-72); font-size: 14.5px; }
.mm-soc { display: flex; gap: 13px; margin-top: 26px; }
.mm-soc a { width: 42px; height: 42px; border: 1px solid var(--verdant-40); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--verdant); transition: all .45s cubic-bezier(.16,1,.3,1); }
.mm-soc a:hover { background: var(--verdant); border-color: var(--verdant); color: var(--linen); }
.mm-foot-bar { margin-top: 66px; padding-top: 24px; border-top: 1px solid var(--verdant-18); display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; color: var(--ink-50); }

.mm-toast { position: fixed; bottom: 34px; left: 50%; transform: translateX(-50%); background: var(--verdant); color: var(--linen); padding: 15px 30px; z-index: 220; animation: mm-fade .4s ease both; box-shadow: 0 16px 40px -20px rgba(61,43,51,.6); }

/* ─── responsive ─── */
@media (max-width: 1080px) {
  .mm-hero-grid, .mm-build, .mm-coll, .mm-coll[data-flip="true"] { grid-template-columns: 1fr; gap: 46px; }
  .mm-coll[data-flip="true"] .mm-coll-art { order: 0; }
  .mm-dossier { position: static; }
  .mm-band { grid-template-columns: 1fr 1fr; }
  .mm-band > div:nth-child(2) { border-right: none; }
  .mm-band > div:nth-child(-n+2) { border-bottom: 1px solid var(--verdant-18); }
  .mm-client { grid-template-columns: 1fr; }
  .mm-foot-grid { grid-template-columns: 1fr 1fr; }
  .mm-hero-branch { display: none; }
}
@media (max-width: 700px) {
  .mm-wrap { padding: 0 22px; }
  .mm-nav-in { padding: 0 22px; height: 104px; gap: 0; }
  .mm-nav .mm-mark { padding: 5px 22px 6px; }
  .mm-sec { padding: 88px 0; }
  .mm-links { display: none; }
  .mm-burger { display: block; position: absolute; right: 22px; top: 50%; transform: translateY(-50%); }
  .mm-links[data-open="true"] { display: flex; position: fixed; inset: 104px 0 auto 0; flex-direction: column; align-items: flex-start; gap: 24px; background: var(--ground); box-shadow: 0 20px 40px -30px rgba(61,43,51,.5); padding: 32px 22px 38px; }
  .mm-opts { grid-template-columns: 1fr; gap: 0; }
  .mm-hero { padding-top: 118px; }
  .mm-piece { border-right: none; flex: 1 1 100%; border-bottom: 1px solid var(--verdant-18); }
  .mm-foot-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .mm *, .mm *::before, .mm *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .mm-rev { opacity: 1 !important; transform: none !important; }
  .mm-anim { stroke-dashoffset: 0; }
}
`;

/* ════════════════ ORNAMENT ════════════════ */

const CornerFlourish = (p) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    {...p}
  >
    <path d="M4 60C4 34 14 14 40 6" />
    <path d="M40 6c-9 1-14 6-15 13 8 2 14-3 15-13z" />
    <path d="M13 42c-5-4-5-11-1-15 5 3 6 10 1 15z" />
    <path d="M25 24c-6-1-9-7-7-12 6 2 9 7 7 12z" />
    <circle cx="8" cy="55" r="2.4" />
    <path d="M4 60c9-2 13-8 12-16" strokeDasharray="1.5 3.5" />
  </svg>
);

const Fleuron = ({ w = 130 }) => (
  <svg
    width={w}
    height="24"
    viewBox="0 0 130 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
    style={{ color: 'var(--gilt)' }}
  >
    <path d="M4 12h34M92 12h34" />
    <path d="M46 12c0-5 4-8 9-8s9 3 9 8-4 8-9 8-9-3-9-8z" />
    <path d="M66 12c0-5 4-8 9-8s9 3 9 8-4 8-9 8-9-3-9-8z" />
    <circle cx="65" cy="12" r="2.6" fill="currentColor" stroke="none" />
    <path d="M38 12c2-3 5-4 8-4M92 12c-2-3-5-4-8-4M38 12c2 3 5 4 8 4M92 12c-2 3-5 4-8 4" />
  </svg>
);

const VineRule = () => (
  <svg
    width="100%"
    height="30"
    viewBox="0 0 1200 30"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
    style={{ color: 'var(--verdant)', opacity: 0.5, display: 'block' }}
  >
    <path
      d="M0 15h1200"
      stroke="currentColor"
      strokeWidth=".8"
      strokeDasharray="0"
      opacity=".4"
    />
    {[...Array(13)].map((_, i) => {
      const x = 46 + i * 92;
      const up = i % 2 === 0;
      return (
        <g key={i} stroke="currentColor" strokeWidth=".9" strokeLinecap="round">
          <path
            d={`M${x} 15c6 ${up ? -7 : 7} 15 ${up ? -8 : 8} 22 ${up ? -6 : 6}`}
          />
          <path
            d={`M${x + 22} ${up ? 9 : 21}c-7 ${up ? 1 : -1}-13 ${up ? -4 : 4}-13 ${up ? -8 : 8} 8 0 13 4 13 8z`}
          />
        </g>
      );
    })}
  </svg>
);

const RoseBranch = (p) => (
  <svg
    viewBox="0 0 320 460"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    style={{ color: 'var(--verdant)' }}
    aria-hidden="true"
    {...p}
  >
    <path d="M300 450C250 380 214 300 206 214c-6-64 8-128 44-186" />
    <path d="M232 300c-40 6-74-14-86-50 42-8 76 12 86 50z" />
    <path d="M216 190c34-14 56-46 52-86-38 14-58 46-52 86z" />
    <path d="M244 372c-34 12-70-2-88-34 36-14 72 0 88 34z" />
    {[
      [206, 120],
      [232, 236],
      [252, 60],
    ].map(([cx, cy], i) => (
      <g key={i} transform={`translate(${cx} ${cy})`}>
        {[...Array(6)].map((_, k) => (
          <ellipse
            key={k}
            rx="10"
            ry="20"
            transform={`rotate(${k * 30}) translate(0 -6)`}
          />
        ))}
        <circle r="6" />
      </g>
    ))}
  </svg>
);

/* ════════════════ DATA ════════════════ */

const SIZES = [
  { in: 6, label: '6 inch', serves: 12, price: 140 },
  { in: 8, label: '8 inch', serves: 24, price: 210 },
  { in: 10, label: '10 inch', serves: 40, price: 300 },
  { in: 12, label: '12 inch', serves: 60, price: 410 },
];

const SPONGES = [
  {
    id: 'vanilla',
    name: 'Vanilla bean',
    sub: 'Madagascan vanilla buttercream',
  },
  { id: 'lemon', name: 'Lemon & elderflower', sub: 'Lemon curd, mascarpone' },
  { id: 'chocolate', name: 'Dark chocolate', sub: '70% Belgian ganache' },
  {
    id: 'pistachio',
    name: 'Pistachio & rose',
    sub: 'Sicilian pistachio, rosewater',
  },
  {
    id: 'raspberry',
    name: 'Raspberry & white chocolate',
    sub: 'Fresh fruit compote',
  },
  { id: 'caramel', name: 'Salted caramel', sub: 'Burnt butter, sea salt' },
  { id: 'carrot', name: 'Spiced carrot & walnut', sub: 'Orange cream cheese' },
  { id: 'fruit', name: 'Traditional fruit', sub: 'Brandy fed, marzipan' },
];

const FINISHES = [
  {
    id: 'buttercream',
    name: 'Smooth buttercream',
    sub: 'Soft sheen, hand finished',
    add: 0,
  },
  {
    id: 'seminaked',
    name: 'Semi-naked',
    sub: 'Sponge showing at the seam',
    add: 30,
  },
  {
    id: 'textured',
    name: 'Palette-knife texture',
    sub: 'Sculpted and painterly',
    add: 60,
  },
  {
    id: 'fondant',
    name: 'Smooth fondant',
    sub: 'Sharp edges, flawless finish',
    add: 95,
  },
  {
    id: 'watercolour',
    name: 'Hand painted',
    sub: 'Botanicals in edible paint',
    add: 150,
  },
];

const DECOR = [
  { id: 'sugarflowers', name: 'Handmade sugar flowers', add: 280 },
  { id: 'lace', name: 'Hand-piped lace', add: 190 },
  { id: 'goldleaf', name: 'Edible gold leaf', add: 140 },
  { id: 'freshflowers', name: 'Fresh flowers, cut that morning', add: 90 },
  { id: 'macarons', name: 'Macaron crown', add: 75 },
  { id: 'drip', name: 'Chocolate or caramel drip', add: 45 },
];

const DIETARY = [
  { id: 'vegan', name: 'Vegan', sub: 'Plant based throughout', pct: 0.1 },
  {
    id: 'gf',
    name: 'Wheat & gluten free',
    sub: 'Separate bench, separate day',
    pct: 0.1,
  },
  { id: 'df', name: 'Dairy free', sub: 'Oat buttercream', pct: 0.08 },
  { id: 'eggfree', name: 'Egg free', sub: '', pct: 0.08 },
  { id: 'nf', name: 'Nut free', sub: 'No nuts on site that week', pct: 0 },
  { id: 'refined', name: 'Less refined sugar', sub: '', pct: 0.06 },
];

const PALETTE = [
  { id: 'ivory', name: 'Ivory', hex: '#FBF7F8' },
  { id: 'blush', name: 'Blush', hex: '#EFD3D6' },
  { id: 'peony', name: 'Peony', hex: '#E2A9B3' },
  { id: 'butter', name: 'Buttercream', hex: '#F2E4BE' },
  { id: 'eaudenil', name: 'Eau de nil', hex: '#CBD9C6' },
  { id: 'sage', name: 'Sage', hex: '#A9BCA2' },
  { id: 'lilac', name: 'Lilac', hex: '#D4C9E2' },
  { id: 'powder', name: 'Powder blue', hex: '#C3D3DE' },
];

const OCCASIONS = [
  'Wedding',
  'Anniversary',
  'Milestone birthday',
  'Christening',
  'Garden party',
  'Private dinner',
];

const HANDOVER = [
  {
    id: 'collect',
    name: 'Collect from the studio',
    sub: 'Bodicote, Banbury, Oxfordshire by appointment',
    add: 0,
  },
  {
    id: 'deliver',
    name: 'Delivery within Oxfordshire',
    sub: 'Boxed, chilled, timed',
    add: 90,
  },
  {
    id: 'install',
    name: 'Delivery & set-up at your venue',
    sub: 'Tiers assembled and dressed',
    add: 220,
  },
  {
    id: 'abroad',
    name: 'Further afield',
    sub: 'Outside the M25 or overseas',
    add: 0,
    poa: true,
  },
];

const COLLECTIONS = [
  {
    n: 'I',
    name: 'Botanica',
    year: 'The flower collection',
    blurb:
      'Every petal cut, veined, dusted and wired by hand across the preceding fortnight. Sugar flowers that guests reach out to touch, because they cannot tell from the arrangement beside them.',
    tiers: [12, 10, 8, 6],
    colour: '#FBF7F8',
    accent: '#E2A9B3',
    decor: ['sugarflowers', 'freshflowers'],
    pieces: [
      { b: 'Ophelia', s: 'Four tiers · serves 136' },
      { b: 'Wisteria', s: 'Three tiers · serves 76' },
      { b: 'Fen Rose', s: 'Two tiers · serves 64' },
    ],
  },
  {
    n: 'II',
    name: 'Orangery',
    year: 'Spring & summer',
    blurb:
      'Made for long tables under glass. Eau de nil and buttercream grounds, trailing lace piped in the old royal manner, and citrus flavours that hold in the heat of a July marquee.',
    tiers: [10, 8, 6],
    colour: '#CBD9C6',
    accent: '#F2E4BE',
    decor: ['lace', 'freshflowers'],
    pieces: [
      { b: 'Seville', s: 'Three tiers · serves 76' },
      { b: 'Kew', s: 'Two tiers · serves 64' },
      { b: 'Verbena', s: 'Single tier · serves 40' },
    ],
  },
  {
    n: 'III',
    name: 'Gilded',
    year: 'Ceremony & occasion',
    blurb:
      'Architectural tiers in lacquered fondant, edged in hand-laid 24ct leaf and finished with a gilded monogram. For ballrooms with height and photographs taken from a distance.',
    tiers: [12, 10, 8],
    colour: '#EFD3D6',
    accent: '#F2E4BE',
    decor: ['goldleaf', 'sugarflowers'],
    pieces: [
      { b: 'Aurelia', s: 'Three tiers · serves 124' },
      { b: 'Bellcourt', s: 'Four tiers · serves 136' },
      { b: 'Solenne', s: 'Five tiers · serves 190' },
    ],
  },
];

const CLIENTS = [
  {
    q: 'She flew to Lake Como with the tiers in the hold and rebuilt the cake in forty minutes. Nobody at the reception knew it had travelled.',
    w: 'Private client',
    d: 'Wedding, five tiers · Lombardy · June 2025',
  },
  {
    q: 'Our daughter is coeliac and has never once had the same cake as everyone else. This time there was only one cake, and it was hers.',
    w: 'The Aldringham family',
    d: 'Christening · Hampshire · April 2025',
  },
  {
    q: "Entirely vegan, at my mother's insistence and against my expectations. I have not been so pleasantly wrong about anything in years.",
    w: 'Private client',
    d: '80th birthday · Belgravia · February 2026',
  },
];

const VENUES = [
  'Hartwell Court',
  'The Osterley Rooms',
  'Château de Vaux-Perrin',
  'Ansley Hall',
  'Villa Serrana',
  'The Bellamy, Mayfair',
];

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    d: 'M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M17.5 6.6h.01',
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/',
    d: 'M9 20.5c-.5-2 .3-4.6.8-6.7-.9-1.9.3-4.6 2.7-4.6 2 0 2.9 1.5 2.5 3.3-.4 2-1.7 3.6-.2 4.6 1.7 1.1 3.9-1.3 3.9-4.4 0-3.2-2.6-5.4-5.9-5.4-4 0-6.3 2.9-6.3 5.8 0 1.1.4 2.3 1 2.9M12 14.5 10 21',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    d: 'M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A4 4 0 0 0 10.5 7v1.5H8V11h2.5v10H14V11h2.4l.6-2.5z',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/',
    d: 'M15 4c.5 2.2 2 3.6 4.2 3.8v3c-1.6.1-3-.4-4.2-1.3v6.1c0 3.4-2.6 5.6-5.6 5.4a5.3 5.3 0 0 1 .3-10.6c.4 0 .8 0 1.2.1v3.1a2.4 2.4 0 1 0 1.7 2.3V4z',
  },
];

/* ════════════════ HELPERS ════════════════ */

const gbp = (n) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const fmtLong = (d) =>
  d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const capacityFor = (d) => {
  const seed =
    (d.getDate() * 37 + (d.getMonth() + 1) * 19 + d.getFullYear()) % 9;
  const weekend = d.getDay() === 6 || d.getDay() === 0;
  if (d.getDay() === 1) return 'closed';
  if (seed < (weekend ? 3 : 1)) return 'taken';
  if (weekend && seed < 5) return 'last';
  return 'open';
};

const Reveal = ({ children, delay = 0, as: Tag = 'div', ...rest }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className="mm-rev"
      data-in={seen}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Icon = ({ d, s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const Petal = (p) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    {...p}
  >
    <path d="M8 1.6c2.6 2 4 4 4 6.4s-1.4 4.4-4 6.4C5.4 12.4 4 10.4 4 8s1.4-4.4 4-6.4z" />
    <path d="M8 1.6v12.8" strokeWidth=".7" />
  </svg>
);

const Head = ({ no, title, right }) => (
  <Reveal>
    <div className="mm-head">
      <span className="no mm-sc">{no}</span>
      <h2>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
        <Fleuron />
      </div>
      {right && <span className="r mm-sc-sm">{right}</span>}
    </div>
  </Reveal>
);

const Cartouche = ({ children }) => (
  <div className="mm-cart">
    <CornerFlourish className="fl tl" />
    <CornerFlourish className="fl tr" />
    <CornerFlourish className="fl bl" />
    <CornerFlourish className="fl br" />
    {children}
  </div>
);

/* ════════════════ THE PLATE ════════════════ */

function Engraving({
  tiers,
  colour,
  accent,
  decor = [],
  finish = 'buttercream',
  animate = false,
  dims = true,
  width = 460,
  height = 520,
}) {
  const baseY = height - 88;
  const tierH = Math.min(70, (height - 200) / Math.max(tiers.length, 1));
  const scale = 13,
    cx = width / 2;
  let y = baseY;
  const rects = tiers.map((size) => {
    const w = size * scale;
    const r = { w, x: cx - w / 2, y: y - tierH, h: tierH, size };
    y -= tierH;
    return r;
  });
  const top = rects[rects.length - 1],
    bottom = rects[0];
  const line = '#4E6B4F',
    hair = 'rgba(78,107,79,.45)',
    gold = '#B08D4F';
  const cap = {
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    letterSpacing: 2,
    fill: 'rgba(61,43,51,.45)',
  };
  const has = (k) => decor.includes(k);
  const edge = 'rgba(61,43,51,.28)';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ display: 'block' }}
      aria-label={`Botanical plate of a ${tiers.length}-tier cake`}
    >
      <defs>
        <linearGradient id="mm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DFC189" />
          <stop offset="55%" stopColor="#B08D4F" />
          <stop offset="100%" stopColor="#8E7040" />
        </linearGradient>
      </defs>

      {/* stand */}
      <ellipse
        cx={cx}
        cy={baseY}
        rx={bottom.w / 2 + 30}
        ry="9"
        fill="none"
        stroke={hair}
        strokeWidth="1"
      />
      <ellipse
        cx={cx}
        cy={baseY + 5}
        rx={bottom.w / 2 + 22}
        ry="6"
        fill="none"
        stroke={hair}
        strokeWidth=".6"
        opacity=".55"
      />
      <line
        x1="48"
        y1={baseY}
        x2={width - 48}
        y2={baseY}
        stroke={hair}
        strokeWidth=".7"
      />
      {/* trailing foliage at the base */}
      {[-1, 1].map((s) => (
        <g
          key={s}
          transform={`translate(${cx + s * (bottom.w / 2 + 16)} ${baseY - 2}) scale(${s} 1)`}
          stroke={line}
          fill="none"
          strokeWidth=".9"
          opacity=".65"
        >
          <path d="M0 0c10 2 20 0 27-6" />
          <path d="M14 -1c-2-5 1-9 6-10 1 5-2 9-6 10z" />
          <path d="M25 -5c-1-5 2-8 7-9 1 5-2 8-7 9z" />
        </g>
      ))}

      <g>
        {rects.map((r, i) => (
          <g
            key={i}
            className={animate ? 'mm-anim' : undefined}
            style={animate ? { animationDelay: `${i * 0.3}s` } : undefined}
          >
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={colour}
              stroke={line}
              strokeWidth=".9"
            />
            <ellipse
              cx={cx}
              cy={r.y}
              rx={r.w / 2}
              ry="8"
              fill={colour}
              stroke={line}
              strokeWidth=".9"
            />
            <ellipse
              cx={cx}
              cy={r.y}
              rx={r.w / 2 - 8}
              ry="5"
              fill="none"
              stroke={edge}
              strokeWidth=".55"
            />

            {finish === 'seminaked' &&
              [0.36, 0.68].map((f, k) => (
                <line
                  key={k}
                  x1={r.x}
                  y1={r.y + r.h * f}
                  x2={r.x + r.w}
                  y2={r.y + r.h * f}
                  stroke={edge}
                  strokeWidth=".7"
                />
              ))}
            {(finish === 'textured' || finish === 'watercolour') &&
              [...Array(6)].map((_, k) => (
                <path
                  key={k}
                  d={`M ${r.x + 4} ${r.y + 11 + k * (r.h / 7)} q ${r.w / 2} ${k % 2 ? 7 : -7} ${r.w - 8} 0`}
                  fill="none"
                  stroke={edge}
                  strokeWidth="1.2"
                  opacity=".6"
                />
              ))}
            {finish === 'silk' &&
              [...Array(7)].map((_, k) => (
                <path
                  key={k}
                  d={`M ${r.x + (k * r.w) / 6} ${r.y + 4} q 6 ${r.h / 2} 0 ${r.h - 6}`}
                  fill="none"
                  stroke={edge}
                  strokeWidth=".75"
                />
              ))}
            {finish === 'fondant' && (
              <rect
                x={r.x + 2.5}
                y={r.y + 2}
                width={r.w - 5}
                height={r.h - 3}
                fill="none"
                stroke="rgba(255,255,255,.5)"
                strokeWidth="1"
              />
            )}

            {has('lace') &&
              [...Array(Math.max(3, Math.round(r.w / 30)))].map((_, k) => (
                <g key={k} stroke="url(#mm-gold)" fill="none" strokeWidth=".85">
                  <path
                    d={`M ${r.x + 5 + k * 30} ${r.y + r.h - 7} q 7.5 -13 15 0`}
                  />
                  <circle
                    cx={r.x + 12.5 + k * 30}
                    cy={r.y + r.h - 12}
                    r="1.5"
                  />
                </g>
              ))}
            {has('goldleaf') &&
              [...Array(6)].map((_, k) => (
                <path
                  key={k}
                  d={`M ${r.x + 10 + ((k * 41) % Math.max(r.w - 26, 18))} ${r.y + 13 + ((k * 27) % Math.max(r.h - 24, 10))} l 8 -5 l 4 8 l -9 4 z`}
                  fill="url(#mm-gold)"
                  opacity=".9"
                />
              ))}
            {has('pressed') &&
              [...Array(7)].map((_, k) => (
                <ellipse
                  key={k}
                  rx="4"
                  ry="7"
                  fill={accent}
                  opacity=".55"
                  stroke={edge}
                  strokeWidth=".4"
                  transform={`translate(${r.x + 14 + ((k * 47) % Math.max(r.w - 28, 20))} ${r.y + 16 + ((k * 31) % Math.max(r.h - 26, 12))}) rotate(${k * 41})`}
                />
              ))}
            {has('monogram') && i === 0 && (
              <g transform={`translate(${cx} ${r.y + r.h / 2})`}>
                <circle
                  r="16"
                  fill="none"
                  stroke="url(#mm-gold)"
                  strokeWidth=".9"
                />
                <circle
                  r="20"
                  fill="none"
                  stroke="url(#mm-gold)"
                  strokeWidth=".5"
                  opacity=".6"
                />
                <text
                  textAnchor="middle"
                  y="7"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 20,
                    fill: gold,
                  }}
                >
                  M
                </text>
              </g>
            )}
            {has('drip') && i === rects.length - 1 && (
              <path
                d={`M ${r.x} ${r.y + 3} ${[...Array(9)].map((_, k) => `q ${r.w / 18} ${k % 2 ? 18 : 5} ${r.w / 9} ${k % 3 === 0 ? 3 : -2}`).join(' ')}`}
                fill="none"
                stroke={accent}
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity=".9"
              />
            )}
            {(has('sugarflowers') || has('freshflowers')) &&
              i < rects.length - 1 && (
                <g>
                  {[...Array(4)].map((_, k) => {
                    const px = r.x + 12 + k * ((r.w - 24) / 3);
                    return (
                      <g key={k} transform={`translate(${px} ${r.y - 4})`}>
                        <path
                          d="M-11 3c7 1 13-1 17-6"
                          stroke={line}
                          fill="none"
                          strokeWidth=".8"
                        />
                        <path
                          d="M-4 2c-1-4 1-7 5-8 1 4-1 7-5 8z"
                          fill="none"
                          stroke={line}
                          strokeWidth=".8"
                        />
                        {[...Array(6)].map((_, p) => (
                          <ellipse
                            key={p}
                            rx="3.4"
                            ry="7"
                            fill={accent}
                            opacity=".92"
                            stroke={edge}
                            strokeWidth=".4"
                            transform={`rotate(${p * 60}) translate(0 -5)`}
                          />
                        ))}
                        <circle r="2.2" fill={gold} />
                      </g>
                    );
                  })}
                </g>
              )}
            {has('macarons') &&
              i === 0 &&
              [...Array(6)].map((_, k) => (
                <g
                  key={k}
                  transform={`translate(${r.x + 14 + k * ((r.w - 28) / 5)} ${r.y + r.h - 13})`}
                >
                  <circle
                    r="6.5"
                    fill={accent}
                    stroke={line}
                    strokeWidth=".6"
                  />
                  <path d="M-6.5 0h13" stroke={line} strokeWidth=".5" />
                </g>
              ))}
          </g>
        ))}
      </g>

      {dims && (
        <g>
          <line
            x1="36"
            y1={top.y - 10}
            x2="36"
            y2={baseY}
            stroke={hair}
            strokeWidth=".6"
          />
          <line
            x1="32"
            y1={baseY}
            x2="40"
            y2={baseY}
            stroke={hair}
            strokeWidth=".6"
          />
          <line
            x1="32"
            y1={top.y - 10}
            x2="40"
            y2={top.y - 10}
            stroke={hair}
            strokeWidth=".6"
          />
          <text
            x="26"
            y={(baseY + top.y) / 2}
            transform={`rotate(-90 26 ${(baseY + top.y) / 2})`}
            textAnchor="middle"
            {...cap}
          >
            {tiers.length * 5} IN
          </text>
          <line
            x1={bottom.x}
            y1={baseY + 28}
            x2={bottom.x + bottom.w}
            y2={baseY + 28}
            stroke={hair}
            strokeWidth=".6"
          />
          <line
            x1={bottom.x}
            y1={baseY + 24}
            x2={bottom.x}
            y2={baseY + 32}
            stroke={hair}
            strokeWidth=".6"
          />
          <line
            x1={bottom.x + bottom.w}
            y1={baseY + 24}
            x2={bottom.x + bottom.w}
            y2={baseY + 32}
            stroke={hair}
            strokeWidth=".6"
          />
          <text x={cx} y={baseY + 46} textAnchor="middle" {...cap}>
            Ø {bottom.size} IN
          </text>
          {rects.map((r, i) => (
            <g key={i}>
              <line
                x1={r.x + r.w}
                y1={r.y + r.h / 2}
                x2={width - 52}
                y2={r.y + r.h / 2}
                stroke={hair}
                strokeWidth=".5"
                strokeDasharray="1 4"
              />
              <text x={width - 48} y={r.y + r.h / 2 + 3} {...cap}>
                {r.size}″
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ════════════════ APP ════════════════ */

export default function App() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [piece, setPiece] = useState(null);

  const say = (m) => setToast(m);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);

  const [occasion, setOccasion] = useState('Wedding');
  const [tiers, setTiers] = useState([12, 10, 8]);
  const [sponge, setSponge] = useState(['lemon']);
  const [finish, setFinish] = useState('watercolour');
  const [colour, setColour] = useState('ivory');
  const [accent, setAccent] = useState('peony');
  const [decor, setDecor] = useState(['sugarflowers', 'lace']);
  const [dietary, setDietary] = useState([]);
  const [inscription, setInscription] = useState('');
  const [notes, setNotes] = useState('');
  const [handover, setHandover] = useState('install');
  const [date, setDate] = useState(null);
  const [step, setStep] = useState(1);

  const toggle = (arr, set, id, max) =>
    set(
      arr.includes(id)
        ? arr.filter((x) => x !== id)
        : max && arr.length >= max
          ? [...arr.slice(1), id]
          : [...arr, id],
    );

  const leadWeeks =
    tiers.length >= 4
      ? 10
      : tiers.length === 3
        ? 8
        : tiers.length === 2
          ? 4
          : 2;
  const earliest = useMemo(
    () => addDays(startOfDay(new Date()), leadWeeks * 7),
    [leadWeeks],
  );
  useEffect(() => {
    if (date && date < earliest) setDate(null);
  }, [earliest]); // eslint-disable-line

  const quote = useMemo(() => {
    const lines = [];
    let base = 0;
    tiers.forEach((t, i) => {
      const s = SIZES.find((x) => x.in === t);
      base += s.price;
      lines.push({
        k: `Tier ${tiers.length - i}`,
        v: `${s.label} · ${gbp(s.price)}`,
      });
    });
    const f = FINISHES.find((x) => x.id === finish);
    const fc = f.add * tiers.length;
    if (fc) lines.push({ k: 'Finish', v: `${f.name} · ${gbp(fc)}` });
    const dc = decor.reduce(
      (s, id) => s + DECOR.find((d) => d.id === id).add,
      0,
    );
    decor.forEach((id) => {
      const d = DECOR.find((x) => x.id === id);
      lines.push({ k: 'Decoration', v: `${d.name} · ${gbp(d.add)}` });
    });
    const ic = inscription.trim() ? 25 : 0;
    if (ic) lines.push({ k: 'Inscription', v: `Hand piped · ${gbp(ic)}` });
    const sub = base + fc + dc + ic;
    const pct = Math.min(
      dietary.reduce((s, id) => s + DIETARY.find((d) => d.id === id).pct, 0),
      0.28,
    );
    const diet = Math.round(sub * pct);
    if (diet) lines.push({ k: 'Adaptation', v: gbp(diet) });
    const h = HANDOVER.find((x) => x.id === handover);
    if (h.add) lines.push({ k: 'Handover', v: `${h.name} · ${gbp(h.add)}` });
    const total = sub + diet + h.add;
    return {
      lines,
      total,
      poa: h.poa,
      retainer: Math.round(total * 0.3),
      balance: total - Math.round(total * 0.3),
      serves: tiers.reduce(
        (s, t) => s + SIZES.find((x) => x.in === t).serves,
        0,
      ),
    };
  }, [tiers, finish, decor, inscription, dietary, handover]);

  const hexOf = (id) => PALETTE.find((c) => c.id === id).hex;
  const goto = (id) => {
    setMenu(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reserve = () => {
    if (!date) {
      say('Choose a date in the studio diary.');
      goto('diary');
      return;
    }
    if (!user) {
      setModal('account');
      say('An account holds the date in your name.');
      return;
    }
    setModal('reserve');
  };

  const Opt = ({ on, onClick, name, sub, price }) => (
    <button className="mm-opt" data-on={on} onClick={onClick}>
      <Petal className="mk" />
      <span className="nm">
        {name}
        {sub && <span className="sub">{sub}</span>}
      </span>
      {price != null && <span className="pr">{price}</span>}
    </button>
  );

  return (
    <div className="mm">
      <style>{CSS}</style>
      <div className="mm-damask" />

      {/* ─── NAV ─── */}
      <nav className="mm-nav" data-solid={solid}>
        <div className="mm-nav-in">
          <button
            className="mm-mark"
            onClick={() => goto('top')}
            aria-label="Butter and Bloom, home"
          >
            <b>Butter &amp; Bloom</b>
            <span>Cake Studio · Bodicote</span>
          </button>
          <div className="mm-links" data-open={menu}>
            {[
              ['collections', 'Collections'],
              ['atelier', 'The Atelier'],
              ['commission', 'Commission'],
              ['diary', 'The Diary'],
              ['clients', 'Clients'],
              ['enquire', 'Enquire'],
            ].map(([id, l]) => (
              <button
                key={id}
                className="mm-link mm-sc-sm"
                onClick={() => goto(id)}
              >
                {l}
              </button>
            ))}
            <button
              className="mm-link mm-sc-sm"
              style={{ color: 'var(--rose)' }}
              onClick={() => setModal('account')}
            >
              {user ? user.name.split(' ')[0] : 'Account'}
            </button>
          </div>
          <button
            className="mm-burger"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
            aria-expanded={menu}
          >
            <Icon
              s={22}
              d={menu ? 'M6 6l12 12M18 6L6 18' : 'M3 8h18M3 16h18'}
            />
          </button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <header id="top" className="mm-wrap mm-hero">
        <RoseBranch className="mm-hero-branch" />
        <div className="mm-hero-grid">
          <Reveal>
            <span className="mm-sc" style={{ color: 'var(--verdant)' }}>
              Est. 2016 · Studio visits by appointment
            </span>
            <h1 style={{ marginTop: 28 }}>
              Grown, not<span className="il">baked.</span>
            </h1>
            <div style={{ margin: '30px 0 26px' }}>
              <Fleuron w={150} />
            </div>
            <p className="mm-lede" style={{ maxWidth: '42ch' }}>
              Every flower on a Butter &amp; Bloom cake is cut, veined and wired
              by hand over the fortnight before your day. A hundred and twenty
              cakes a year, each one drawn before it is agreed, tasted before it
              is made, and carried to your table by the woman who made it.
            </p>
            <div
              style={{
                marginTop: 40,
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
              }}
            >
              <button
                className="mm-btn mm-btn-rose"
                onClick={() => goto('commission')}
              >
                <span>Begin a commission</span>
              </button>
              <button className="mm-btn" onClick={() => goto('collections')}>
                <span>The collections</span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Cartouche>
              <div className="mm-plate">
                <div style={{ padding: '18px 8px 0' }}>
                  <Engraving
                    tiers={[8, 10, 12]}
                    colour="#FBF7F8"
                    accent="#E2A9B3"
                    decor={['sugarflowers', 'lace', 'goldleaf']}
                    finish="watercolour"
                    animate
                    width={470}
                    height={540}
                  />
                </div>
                <div className="mm-plate-cap mm-sc-sm">
                  <span>Pl. I — “Ophelia”</span>
                  <span>Four tiers · Botanica</span>
                </div>
              </div>
            </Cartouche>
          </Reveal>
        </div>
        <div className="mm-hero-meta mm-sc-sm">
          <span>Bodicote, Banbury, Oxfordshire</span>
          <span>Delivered across Britain &amp; Europe</span>
          <span>Vegan &amp; gluten free, always</span>
        </div>
      </header>

      <VineRule />

      {/* ─── BAND ─── */}
      <div className="mm-wrap">
        <Reveal>
          <div className="mm-band">
            {[
              ['120', 'Cakes each year'],
              ['8', 'Signature flavours'],
              ['2', 'Weeks minimum notice'],
              ['100%', 'Adaptable to any diet'],
            ].map(([b, s]) => (
              <div key={s}>
                <b>{b}</b>
                <span className="mm-sc-sm">{s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <VineRule />

      {/* ─── MANIFESTO ─── */}
      <section className="mm-sec mm-wrap" style={{ paddingBottom: 90 }}>
        <Reveal>
          <div className="mm-manifesto">
            <p className="mm-drop">
              A cake at this level is not catering. It is the one thing in the
              room that everybody photographs, that you keep a tier of, and that
              has to be <em>right the first time</em> — because there is never a
              second one.
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              <Fleuron w={170} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section
        id="collections"
        className="mm-panel"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <VineRule />
        <div className="mm-wrap mm-sec">
          <Head
            no="Chapter One"
            title="The Collections"
            right="Three families of work"
          />
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.n}>
              <div className="mm-coll" data-flip={i % 2 === 1}>
                <div
                  className="mm-coll-art"
                  role="button"
                  tabIndex={0}
                  onClick={() => setPiece(c)}
                  onKeyDown={(e) => e.key === 'Enter' && setPiece(c)}
                >
                  <Cartouche>
                    <div className="mm-plate">
                      <Engraving
                        tiers={[...c.tiers].reverse()}
                        colour={c.colour}
                        accent={c.accent}
                        decor={c.decor}
                        finish="watercolour"
                        dims={false}
                        width={400}
                        height={450}
                      />
                      <div className="mm-plate-cap mm-sc-sm">
                        <span>Pl. {c.n}</span>
                        <span>{c.year}</span>
                      </div>
                    </div>
                  </Cartouche>
                </div>
                <div>
                  <span className="mm-sc" style={{ color: 'var(--verdant)' }}>
                    Collection {c.n}
                  </span>
                  <h3>{c.name}</h3>
                  <p className="mm-lede" style={{ maxWidth: '48ch' }}>
                    {c.blurb}
                  </p>
                  <div className="mm-pieces">
                    {c.pieces.map((p) => (
                      <div className="mm-piece" key={p.b}>
                        <b>{p.b}</b>
                        <span className="mm-sc-sm">{p.s}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mm-btn"
                    style={{ marginTop: 32 }}
                    onClick={() => {
                      setTiers([...c.tiers]);
                      setColour(
                        PALETTE.find((x) => x.hex === c.colour)?.id || 'ivory',
                      );
                      setAccent(
                        PALETTE.find((x) => x.hex === c.accent)?.id || 'peony',
                      );
                      setDecor(c.decor);
                      goto('commission');
                      say(
                        `Begun from ${c.name}. Everything remains yours to change.`,
                      );
                    }}
                  >
                    <span>Commission in this manner</span>
                    <Icon d="M5 12h14M13 6l6 6-6 6" s={13} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <VineRule />
      </section>

      {/* ─── ATELIER ─── */}
      <section id="atelier" className="mm-wrap mm-sec">
        <Head
          no="Chapter Two"
          title="Inside the Atelier"
          right="Four movements"
        />
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}
          className="mm-at-grid"
        >
          {[
            {
              n: 'I',
              t: 'The audience',
              d: 'An hour in Mayfair or at your own table. She wants the room, the light, the dress, the flowers — and the guest nobody has mentioned yet.',
              w: 'By appointment',
            },
            {
              n: 'II',
              t: 'The drawing',
              d: 'A hand-drawn elevation in ink and gouache, with flavours, dimensions and a fixed price. Yours to keep, whether or not you go ahead.',
              w: 'Within five days',
            },
            {
              n: 'III',
              t: 'The tasting',
              d: 'Ten flavours, plated, served with the wines you intend to pour. Change everything at this stage — it costs nothing but an afternoon.',
              w: '£180, credited on commission',
            },
            {
              n: 'IV',
              t: 'The delivery',
              d: 'Built across the three days before, driven refrigerated, assembled on your table and dressed by hand. She stays until it is level.',
              w: 'Your day',
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div
                style={{
                  padding: '8px 32px 40px 0',
                  borderRight: i < 3 ? '1px solid var(--verdant-18)' : 'none',
                  height: '100%',
                }}
              >
                <div
                  className="mm-d"
                  style={{ fontSize: 40, color: 'var(--rose)' }}
                >
                  {s.n}
                </div>
                <h3
                  className="mm-d"
                  style={{
                    fontSize: 28,
                    margin: '14px 0 12px',
                    fontWeight: 400,
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-72)',
                    fontSize: 14.5,
                    lineHeight: 1.85,
                  }}
                >
                  {s.d}
                </p>
                <div
                  className="mm-sc-sm"
                  style={{ marginTop: 20, color: 'var(--verdant)' }}
                >
                  {s.w}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mm-aside" style={{ marginTop: 46, maxWidth: 720 }}>
            <strong style={{ fontWeight: 500 }}>
              Why the studio asks for time.
            </strong>{' '}
            Sugar flowers are wired and dried over ten days. Ganache sets under
            weight for three. A single tier can be made in a fortnight; four
            tiers need closer to ten, and rushing them shows.
          </div>
        </Reveal>
        <style>{`@media (max-width: 980px){ .mm-at-grid { grid-template-columns: 1fr 1fr !important; } }
                 @media (max-width: 640px){ .mm-at-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ─── COMMISSION ─── */}
      <section
        id="commission"
        className="mm-panel"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <VineRule />
        <div className="mm-wrap mm-sec">
          <Head
            no="Chapter Three"
            title="Design Your Cake"
            right="Four short steps · estimate updates as you go"
          />
          <div className="mm-build">
            <div>
              <div className="mm-steps">
                {[
                  ['Size', 'Occasion and tiers'],
                  ['Flavour', 'What is inside'],
                  ['Look', 'Colour and finish'],
                  ['Details', 'Diet and delivery'],
                ].map(([t, d], i) => (
                  <button
                    key={t}
                    className="mm-stepbtn"
                    data-on={step === i + 1}
                    onClick={() => setStep(i + 1)}
                  >
                    <span className="num">{i + 1}</span>
                    <span className="mm-sc-sm" style={{ display: 'block' }}>
                      {t}
                    </span>
                    <span
                      className="mm-sc-sm"
                      style={{
                        display: 'block',
                        opacity: 0.6,
                        letterSpacing: '.1em',
                        marginTop: 3,
                      }}
                    >
                      {d}
                    </span>
                  </button>
                ))}
              </div>

              {step === 1 && (
                <>
                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>The occasion</h3>
                    </div>
                    <div className="mm-inline">
                      {OCCASIONS.map((o) => (
                        <button
                          key={o}
                          className="mm-tab mm-sc-sm"
                          data-on={occasion === o}
                          onClick={() => setOccasion(o)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Size</h3>
                      <span className="h mm-sc-sm">
                        Serves approximately {quote.serves}
                      </span>
                    </div>
                    <div className="mm-inline" style={{ marginBottom: 20 }}>
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          className="mm-tab mm-sc-sm"
                          data-on={tiers.length === n}
                          onClick={() =>
                            setTiers(
                              [12, 10, 8, 6].slice(0, n).sort((a, b) => b - a),
                            )
                          }
                        >
                          {['One', 'Two', 'Three', 'Four'][n - 1]} tier
                          {n > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                    {tiers.map((t, i) => (
                      <div className="mm-tierrow" key={i}>
                        <label className="mm-sc-sm">
                          Tier {tiers.length - i}
                        </label>
                        <select
                          className="mm-native"
                          value={t}
                          onChange={(e) => {
                            const n = [...tiers];
                            n[i] = Number(e.target.value);
                            setTiers(n);
                          }}
                        >
                          {SIZES.map((s) => (
                            <option key={s.in} value={s.in}>
                              {s.label} — serves {s.serves} — {gbp(s.price)}
                            </option>
                          ))}
                        </select>
                        <span
                          className="mm-sc-sm"
                          style={{ color: 'var(--ink-50)' }}
                        >
                          {i === 0
                            ? 'Base'
                            : i === tiers.length - 1
                              ? 'Crown'
                              : 'Middle'}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mm-group" style={{ borderBottom: 'none' }}>
                    <div className="mm-group-head">
                      <h3>Flavour</h3>
                      <span className="h mm-sc-sm">
                        One per tier — up to {tiers.length}
                      </span>
                    </div>
                    <div className="mm-opts">
                      {SPONGES.map((s) => (
                        <Opt
                          key={s.id}
                          on={sponge.includes(s.id)}
                          name={s.name}
                          sub={s.sub}
                          onClick={() =>
                            toggle(sponge, setSponge, s.id, tiers.length)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Finish</h3>
                      <span className="h mm-sc-sm">Per tier</span>
                    </div>
                    <div className="mm-opts">
                      {FINISHES.map((f) => (
                        <Opt
                          key={f.id}
                          on={finish === f.id}
                          name={f.name}
                          sub={f.sub}
                          price={f.add ? `+${gbp(f.add)}` : '—'}
                          onClick={() => setFinish(f.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Colour</h3>
                      <span className="h mm-sc-sm">Icing, then flowers</span>
                    </div>
                    <div className="mm-swatches" style={{ marginBottom: 24 }}>
                      {PALETTE.map((c) => (
                        <button
                          key={c.id}
                          className="mm-sw"
                          style={{ background: c.hex }}
                          data-on={colour === c.id}
                          onClick={() => setColour(c.id)}
                          title={`Icing — ${c.name}`}
                          aria-label={`Icing ${c.name}`}
                        >
                          <i />
                        </button>
                      ))}
                    </div>
                    <div className="mm-swatches">
                      {PALETTE.map((c) => (
                        <button
                          key={c.id}
                          className="mm-sw"
                          style={{ background: c.hex, width: 30, height: 30 }}
                          data-on={accent === c.id}
                          onClick={() => setAccent(c.id)}
                          title={`Flowers — ${c.name}`}
                          aria-label={`Flowers ${c.name}`}
                        >
                          <i />
                        </button>
                      ))}
                    </div>
                    <p
                      className="mm-sc-sm"
                      style={{ marginTop: 16, color: 'var(--ink-50)' }}
                    >
                      Icing {PALETTE.find((c) => c.id === colour).name} ·
                      Flowers {PALETTE.find((c) => c.id === accent).name} —
                      matched to a ribbon, swatch or invitation on request
                    </p>
                  </div>

                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Decoration</h3>
                      <span className="h mm-sc-sm">Choose any</span>
                    </div>
                    <div className="mm-opts">
                      {DECOR.map((d) => (
                        <Opt
                          key={d.id}
                          on={decor.includes(d.id)}
                          name={d.name}
                          price={`+${gbp(d.add)}`}
                          onClick={() => toggle(decor, setDecor, d.id)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Dietary</h3>
                      <span className="h mm-sc-sm">Never a lesser cake</span>
                    </div>
                    <div className="mm-opts">
                      {DIETARY.map((d) => (
                        <Opt
                          key={d.id}
                          on={dietary.includes(d.id)}
                          name={d.name}
                          sub={d.sub}
                          price={d.pct ? `+${Math.round(d.pct * 100)}%` : '—'}
                          onClick={() => toggle(dietary, setDietary, d.id)}
                        />
                      ))}
                    </div>
                    {dietary.length > 0 && (
                      <div className="mm-aside" style={{ marginTop: 22 }}>
                        Allergen-critical commissions are baked first, on a
                        deep-cleaned bench, in a week when the offending
                        ingredient does not enter the building. The studio
                        confirms the arrangements to you in writing before any
                        deposit is taken.
                      </div>
                    )}
                  </div>

                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Inscription</h3>
                      <span className="h mm-sc-sm">Hand piped · £25</span>
                    </div>
                    <input
                      className="mm-in"
                      value={inscription}
                      maxLength={48}
                      onChange={(e) => setInscription(e.target.value)}
                      placeholder="Amelia &amp; Frederick — the twelfth of June"
                    />
                  </div>

                  <div className="mm-group">
                    <div className="mm-group-head">
                      <h3>Handover</h3>
                    </div>
                    <div className="mm-opts">
                      {HANDOVER.map((h) => (
                        <Opt
                          key={h.id}
                          on={handover === h.id}
                          name={h.name}
                          sub={h.sub}
                          price={
                            h.poa
                              ? 'On application'
                              : h.add
                                ? `+${gbp(h.add)}`
                                : '—'
                          }
                          onClick={() => setHandover(h.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mm-group" style={{ borderBottom: 'none' }}>
                    <div className="mm-group-head">
                      <h3>Notes for the studio</h3>
                      <span className="h mm-sc-sm">Optional</span>
                    </div>
                    <textarea
                      className="mm-in"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="The venue and the light in it. Your florist. A photograph you'd like us to work from. Anyone at the table who can't eat something."
                    />
                  </div>
                </>
              )}

              <div className="mm-stepnav">
                {step > 1 ? (
                  <button
                    className="mm-btn mm-btn-sm"
                    onClick={() => setStep(step - 1)}
                  >
                    <span>Back</span>
                  </button>
                ) : (
                  <span />
                )}
                <span className="mm-choice mm-sc-sm">Step {step} of 4</span>
                {step < 4 ? (
                  <button
                    className="mm-btn mm-btn-rose mm-btn-sm"
                    onClick={() => setStep(step + 1)}
                  >
                    <span>Next</span>
                  </button>
                ) : (
                  <button
                    className="mm-btn mm-btn-rose mm-btn-sm"
                    onClick={() => goto('diary')}
                  >
                    <span>Choose a date</span>
                  </button>
                )}
              </div>
            </div>

            {/* dossier */}
            <aside className="mm-dossier">
              <Cartouche>
                <div className="mm-plate">
                  <div style={{ padding: '16px 8px 0' }}>
                    <Engraving
                      tiers={[...tiers].reverse()}
                      colour={hexOf(colour)}
                      accent={hexOf(accent)}
                      decor={decor}
                      finish={finish}
                      width={420}
                      height={440}
                    />
                  </div>
                  <div className="mm-doss-body">
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>
                      <Fleuron w={110} />
                    </div>
                    <div
                      className="mm-sc"
                      style={{
                        color: 'var(--verdant)',
                        textAlign: 'center',
                        marginBottom: 20,
                      }}
                    >
                      Commission dossier
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Occasion</span>
                      <span className="v">{occasion}</span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Build</span>
                      <span className="v">
                        {tiers.length} tier ·{' '}
                        {tiers.map((t) => `${t}″`).join(' / ')}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Serves</span>
                      <span className="v">≈ {quote.serves}</span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Flavour</span>
                      <span className="v">
                        {sponge.length
                          ? sponge
                              .map(
                                (id) => SPONGES.find((s) => s.id === id).name,
                              )
                              .join(', ')
                          : 'To be tasted'}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Finish</span>
                      <span className="v">
                        {FINISHES.find((f) => f.id === finish).name}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Palette</span>
                      <span className="v">
                        {PALETTE.find((c) => c.id === colour).name} /{' '}
                        {PALETTE.find((c) => c.id === accent).name}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Decoration</span>
                      <span className="v">
                        {decor.length
                          ? decor
                              .map((d) => DECOR.find((x) => x.id === d).name)
                              .join(' · ')
                          : 'Undressed'}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Dietary</span>
                      <span className="v">
                        {dietary.length
                          ? dietary
                              .map((d) => DIETARY.find((x) => x.id === d).name)
                              .join(', ')
                          : 'Standard'}
                      </span>
                    </div>
                    {inscription.trim() && (
                      <div className="mm-row">
                        <span className="k mm-sc-sm">Piped</span>
                        <span className="v">“{inscription}”</span>
                      </div>
                    )}
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Handover</span>
                      <span className="v">
                        {HANDOVER.find((h) => h.id === handover).name}
                      </span>
                    </div>
                    <div className="mm-row">
                      <span className="k mm-sc-sm">Date</span>
                      <span
                        className="v"
                        style={{
                          color: date ? 'var(--verdant)' : 'var(--rose)',
                        }}
                      >
                        {date ? fmtLong(date) : 'Not yet held'}
                      </span>
                    </div>

                    <div className="mm-invest">
                      <span
                        className="mm-sc-sm"
                        style={{ color: 'var(--verdant)' }}
                      >
                        Estimated total
                      </span>
                      <b>{quote.poa ? 'POA' : gbp(quote.total)}</b>
                      <span
                        className="mm-sc-sm"
                        style={{ color: 'var(--ink-50)' }}
                      >
                        {quote.poa
                          ? 'Travel quoted on application'
                          : `Deposit ${gbp(quote.retainer)} · balance ${gbp(quote.balance)}`}
                      </span>
                    </div>

                    <details style={{ marginTop: 18 }}>
                      <summary
                        className="mm-sc-sm"
                        style={{ cursor: 'pointer', color: 'var(--verdant)' }}
                      >
                        Itemised
                      </summary>
                      <div style={{ marginTop: 12 }}>
                        {quote.lines.map((l, i) => (
                          <div className="mm-row" key={i}>
                            <span className="k mm-sc-sm">{l.k}</span>
                            <span className="v">{l.v}</span>
                          </div>
                        ))}
                      </div>
                    </details>

                    <button
                      className="mm-btn mm-btn-rose"
                      style={{ width: '100%', marginTop: 24 }}
                      onClick={date ? reserve : () => goto('diary')}
                    >
                      <span>
                        {date
                          ? `Hold this date · ${gbp(quote.retainer)} deposit`
                          : 'Choose your date'}
                      </span>
                    </button>
                    <p
                      className="mm-sc-sm"
                      style={{
                        textAlign: 'center',
                        marginTop: 14,
                        color: 'var(--ink-50)',
                        lineHeight: 2,
                      }}
                    >
                      An estimate — we confirm the final price on the drawing.
                    </p>
                  </div>
                </div>
              </Cartouche>
            </aside>
          </div>
        </div>
        <VineRule />
      </section>

      {/* ─── DIARY ─── */}
      <Diary
        earliest={earliest}
        leadWeeks={leadWeeks}
        tiers={tiers}
        date={date}
        setDate={setDate}
        quote={quote}
        onReserve={reserve}
      />

      {/* ─── CLIENTS ─── */}
      <section
        id="clients"
        className="mm-panel"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <VineRule />
        <div className="mm-wrap mm-sec">
          <Head
            no="Chapter Five"
            title="In Their Own Words"
            right="Names withheld by request"
          />
          <div className="mm-client">
            {CLIENTS.map((c, i) => (
              <Reveal as="figure" key={i} delay={i * 110}>
                <div style={{ marginBottom: 20 }}>
                  <Fleuron w={90} />
                </div>
                <blockquote>“{c.q}”</blockquote>
                <footer>
                  <div
                    className="mm-d"
                    style={{
                      fontSize: 19,
                      fontWeight: 400,
                      color: 'var(--ink)',
                    }}
                  >
                    {c.w}
                  </div>
                  <div className="mm-sc-sm" style={{ marginTop: 7 }}>
                    {c.d}
                  </div>
                </footer>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 80 }}>
              <div
                className="mm-sc"
                style={{
                  color: 'var(--verdant)',
                  textAlign: 'center',
                  marginBottom: 26,
                }}
              >
                Recommended by
              </div>
              <div className="mm-venues">
                {VENUES.map((v) => (
                  <div key={v}>{v}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <VineRule />
      </section>

      {/* ─── ENQUIRE ─── */}
      <Enquire
        onSend={() =>
          say(
            'Received with thanks. The studio replies within two working days.',
          )
        }
      />

      {/* ─── FOOTER ─── */}
      <footer className="mm-foot">
        <VineRule />
        <div className="mm-wrap" style={{ paddingTop: 70 }}>
          <div className="mm-foot-grid">
            <div>
              <div className="mm-mark">
                <b style={{ fontSize: 27 }}>Butter &amp; Bloom</b>
                <span>Cake Studio · Bodicote</span>
              </div>
              <p
                style={{
                  marginTop: 22,
                  color: 'var(--ink-72)',
                  fontSize: 14.5,
                  maxWidth: '36ch',
                }}
              >
                Private cake commissions, made one at a time in Mayfair.
                Delivered and installed across Britain and Europe; further
                afield by arrangement.
              </p>
              <div className="mm-soc">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.name}
                  >
                    <Icon d={s.d} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mm-sc-sm">The Atelier</h4>
              <ul>
                <li>Bodicote</li>
                <li>Banbury</li>
                <li style={{ marginTop: 16, color: 'var(--ink-50)' }}>
                  Wednesday – Saturday
                </li>
                <li style={{ color: 'var(--ink-50)' }}>By appointment only</li>
              </ul>
            </div>
            <div>
              <h4 className="mm-sc-sm">Enquiries</h4>
              <ul>
                <li>
                  <a href="mailto:hello@butterandbloom.co.uk">
                    hello@butterandbloom.co.uk
                  </a>
                </li>
                <li>
                  <a href="tel:+442071234567">+44 20 7123 4567</a>
                </li>
                <li style={{ marginTop: 16, color: 'var(--ink-50)' }}>
                  Replies within two working days
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mm-sc-sm">Practical</h4>
              <ul>
                <li>
                  <button onClick={() => goto('commission')}>
                    Begin a commission
                  </button>
                </li>
                <li>
                  <button onClick={() => goto('diary')}>
                    The studio diary
                  </button>
                </li>
                <li>
                  <button onClick={() => setModal('account')}>
                    Your account
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      say(
                        'Allergen matrix sent on request — ask in your enquiry.',
                      )
                    }
                  >
                    Allergen matrix
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mm-foot-bar mm-sc-sm">
            <span>© {new Date().getFullYear()} Butter &amp; Bloom</span>
            <span>
              Deposits are non-refundable within twenty-eight days of the date
            </span>
          </div>
        </div>
      </footer>

      {modal === 'account' && (
        <AccountModal
          user={user}
          setUser={setUser}
          close={() => setModal(null)}
          say={say}
        />
      )}
      {modal === 'reserve' && (
        <ReserveModal
          close={() => setModal(null)}
          quote={quote}
          date={date}
          tiers={tiers}
          occasion={occasion}
          user={user}
          onDone={() => {
            setModal(null);
            say(`${fmtLong(date)} is held in your name.`);
          }}
        />
      )}
      {piece && <PlateModal item={piece} close={() => setPiece(null)} />}
      {toast && <div className="mm-toast mm-sc-sm">{toast}</div>}
    </div>
  );
}

/* ════════════════ DIARY ════════════════ */

function Diary({
  earliest,
  leadWeeks,
  tiers,
  date,
  setDate,
  quote,
  onReserve,
}) {
  const [cursor, setCursor] = useState(
    () => new Date(earliest.getFullYear(), earliest.getMonth(), 1),
  );
  useEffect(() => {
    setCursor(new Date(earliest.getFullYear(), earliest.getMonth(), 1));
  }, [earliest]);

  const days = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const off = (first.getDay() + 6) % 7;
    const count = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0,
    ).getDate();
    return [
      ...Array(off).fill(null),
      ...[...Array(count)].map(
        (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1),
      ),
    ];
  }, [cursor]);

  const min = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  const max = new Date(earliest.getFullYear(), earliest.getMonth() + 14, 1);
  const stateOf = (d) => (!d || d < earliest ? 'closed' : capacityFor(d));

  return (
    <section id="diary" className="mm-wrap mm-sec">
      <Head
        no="Chapter Four"
        title="The Studio Diary"
        right={`${leadWeeks} weeks' notice for ${tiers.length} tier${tiers.length > 1 ? 's' : ''}`}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 66,
          alignItems: 'start',
        }}
        className="mm-di-grid"
      >
        <Reveal>
          <h2
            className="mm-d"
            style={{ fontSize: 'clamp(32px,4vw,50px)', maxWidth: '13ch' }}
          >
            Three cakes a week. <em>These are the dates left.</em>
          </h2>
          <p className="mm-lede" style={{ marginTop: 24, maxWidth: '44ch' }}>
            Your earliest date moves with the design. A single tier needs a
            fortnight. Four tiers need ten weeks, because sugar flowers cannot
            be hurried and the studio will not pretend otherwise.
          </p>

          <div className="mm-timeline">
            <div
              className="mm-sc-sm"
              style={{ flex: 1, color: 'var(--ink-50)' }}
            >
              Today
            </div>
            <div
              className="mm-sc-sm"
              style={{
                flex: leadWeeks / 2,
                background: 'rgba(78,107,79,.13)',
                color: 'var(--verdant)',
              }}
            >
              {leadWeeks} weeks in the atelier
            </div>
            <div
              className="mm-sc-sm"
              style={{
                flex: 1.2,
                background: 'var(--rose)',
                color: 'var(--linen)',
              }}
            >
              Your day
            </div>
          </div>

          <div className="mm-row">
            <span className="k mm-sc-sm">Earliest available</span>
            <span className="v">{fmtLong(earliest)}</span>
          </div>
          <div className="mm-row">
            <span className="k mm-sc-sm">Tasting</span>
            <span className="v">Arranged once the deposit is received</span>
          </div>
          <div className="mm-row">
            <span className="k mm-sc-sm">Design frozen</span>
            <span className="v">
              {date ? fmtLong(addDays(date, -28)) : 'Twenty-eight days before'}
            </span>
          </div>
          <div className="mm-row">
            <span className="k mm-sc-sm">Balance due</span>
            <span className="v">
              {date ? fmtLong(addDays(date, -14)) : 'Fourteen days before'}
            </span>
          </div>

          {date && (
            <div
              style={{
                marginTop: 36,
                padding: 28,
                border: '1px solid var(--gilt-30)',
                background: 'rgba(176,141,79,.07)',
              }}
            >
              <span className="mm-sc-sm" style={{ color: 'var(--verdant)' }}>
                Selected
              </span>
              <div
                className="mm-d"
                style={{
                  fontSize: 32,
                  margin: '12px 0 14px',
                  color: 'var(--rose)',
                }}
              >
                {fmtLong(date)}
              </div>
              <span className="mm-sc-sm" style={{ color: 'var(--ink-50)' }}>
                {quote.poa
                  ? 'Price on application'
                  : `Deposit ${gbp(quote.retainer)} · balance ${gbp(quote.balance)}`}
              </span>
              <div>
                <button
                  className="mm-btn mm-btn-rose"
                  style={{ marginTop: 22 }}
                  onClick={onReserve}
                >
                  <span>Hold this date</span>
                </button>
              </div>
            </div>
          )}
        </Reveal>

        <Reveal delay={140}>
          <Cartouche>
            <div className="mm-cal">
              <div className="mm-cal-head">
                <button
                  className="mm-btn mm-btn-sm"
                  onClick={() =>
                    setCursor(
                      new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1),
                    )
                  }
                  disabled={cursor <= min}
                  aria-label="Previous month"
                >
                  <span>
                    <Icon d="M15 6l-6 6 6 6" s={13} />
                  </span>
                </button>
                <div className="mm-d" style={{ fontSize: 24 }}>
                  {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
                </div>
                <button
                  className="mm-btn mm-btn-sm"
                  onClick={() =>
                    setCursor(
                      new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1),
                    )
                  }
                  disabled={cursor >= max}
                  aria-label="Next month"
                >
                  <span>
                    <Icon d="M9 6l6 6-6 6" s={13} />
                  </span>
                </button>
              </div>
              <div className="mm-cal-grid">
                {DOW.map((d, i) => (
                  <div className="mm-dow mm-sc-sm" key={i}>
                    {d}
                  </div>
                ))}
                {days.map((d, i) => {
                  const st = stateOf(d);
                  return (
                    <button
                      key={i}
                      className="mm-day"
                      data-state={st}
                      data-on={sameDay(d, date)}
                      disabled={!d || st === 'closed' || st === 'taken'}
                      onClick={() =>
                        d && (st === 'open' || st === 'last') && setDate(d)
                      }
                      aria-label={d ? `${fmtLong(d)} — ${st}` : undefined}
                    >
                      {d ? d.getDate() : ''}
                      {st === 'last' && <span className="dot" />}
                    </button>
                  );
                })}
              </div>
              <div className="mm-legend mm-sc-sm">
                <span>
                  <i
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 9,
                      background: 'var(--rose)',
                      display: 'inline-block',
                    }}
                  />{' '}
                  Held
                </span>
                <span>
                  <i
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 9,
                      background: 'var(--verdant)',
                      display: 'inline-block',
                    }}
                  />{' '}
                  Last date that week
                </span>
                <span>
                  <i
                    style={{
                      width: 13,
                      height: 1,
                      background: 'var(--ink-28)',
                      display: 'inline-block',
                    }}
                  />{' '}
                  Taken
                </span>
                <span style={{ opacity: 0.8 }}>Mondays closed</span>
              </div>
            </div>
          </Cartouche>
        </Reveal>
      </div>
      <style>{`@media (max-width: 1080px){ .mm-di-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════ ENQUIRE ════════════════ */

function Enquire({ onSend }) {
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    msg: '',
  });
  const ok =
    f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.msg.trim().length > 4;
  return (
    <section id="enquire" className="mm-wrap mm-sec">
      <Head
        no="Chapter Six"
        title="Enquire"
        right="A reply within two working days"
      />
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 74 }}
        className="mm-en-grid"
      >
        <Reveal>
          <h2
            className="mm-d"
            style={{ fontSize: 'clamp(34px,4.4vw,56px)', maxWidth: '12ch' }}
          >
            Tell the studio about <em>the day.</em>
          </h2>
          <p className="mm-lede" style={{ marginTop: 26, maxWidth: '42ch' }}>
            Most clients arrive with a date, a number and a feeling — nothing
            more. That is exactly the right place to start. We reply with a
            drawing and a fixed price.
          </p>
          <div style={{ marginTop: 44 }}>
            <div className="mm-row">
              <span className="k mm-sc-sm">Decoration</span>
              <span className="v">Banbury, Bodicote, Oxfordshire</span>
            </div>
            <div className="mm-row">
              <span className="k mm-sc-sm">Telephone</span>
              <span className="v">+44 20 7123 4567</span>
            </div>
            <div className="mm-row">
              <span className="k mm-sc-sm">Email</span>
              <span className="v">
                <a
                  href="mailto:hello@butterandbloom.co.uk"
                  style={{ color: 'var(--rose)' }}
                >
                  hello@butterandbloom.co.uk
                </a>
              </span>
            </div>
            <div className="mm-row">
              <span className="k mm-sc-sm">Appointments</span>
              <span className="v">Wednesday – Saturday</span>
            </div>
          </div>
          <div className="mm-soc" style={{ marginTop: 32 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.name}
              >
                <Icon d={s.d} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <Cartouche>
            <div className="mm-plate" style={{ padding: 32 }}>
              <div className="mm-stack">
                <div>
                  <label className="mm-lbl mm-sc-sm">Your name</label>
                  <input
                    className="mm-in"
                    value={f.name}
                    onChange={(e) => setF({ ...f, name: e.target.value })}
                    placeholder="Amelia Hartwell"
                  />
                </div>
                <div style={{ display: 'flex', gap: 22 }}>
                  <div style={{ flex: 1 }}>
                    <label className="mm-lbl mm-sc-sm">Email</label>
                    <input
                      className="mm-in"
                      type="email"
                      value={f.email}
                      onChange={(e) => setF({ ...f, email: e.target.value })}
                      placeholder="amelia@example.com"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="mm-lbl mm-sc-sm">Telephone</label>
                    <input
                      className="mm-in"
                      value={f.phone}
                      onChange={(e) => setF({ ...f, phone: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 22 }}>
                  <div style={{ flex: 1 }}>
                    <label className="mm-lbl mm-sc-sm">Date</label>
                    <input
                      className="mm-in"
                      type="date"
                      value={f.date}
                      onChange={(e) => setF({ ...f, date: e.target.value })}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="mm-lbl mm-sc-sm">Venue</label>
                    <input
                      className="mm-in"
                      value={f.venue}
                      onChange={(e) => setF({ ...f, venue: e.target.value })}
                      placeholder="If known"
                    />
                  </div>
                </div>
                <div>
                  <label className="mm-lbl mm-sc-sm">
                    What do you have in mind?
                  </label>
                  <textarea
                    className="mm-in"
                    rows={5}
                    value={f.msg}
                    onChange={(e) => setF({ ...f, msg: e.target.value })}
                    placeholder="One hundred and forty guests, September, a walled garden in Provence. Roses, ivory and green. My father is coeliac."
                  />
                </div>
                <button
                  className="mm-btn mm-btn-rose"
                  style={{ width: '100%' }}
                  disabled={!ok}
                  onClick={() => {
                    onSend();
                    setF({
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                      venue: '',
                      msg: '',
                    });
                  }}
                >
                  <span>Send enquiry</span>
                </button>
                {!ok && (
                  <p
                    className="mm-sc-sm"
                    style={{ textAlign: 'center', color: 'var(--ink-50)' }}
                  >
                    A name, a working email and a few words are needed.
                  </p>
                )}
              </div>
            </div>
          </Cartouche>
        </Reveal>
      </div>
      <style>{`@media (max-width: 1080px){ .mm-en-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ════════════════ MODALS ════════════════ */

function AccountModal({ user, setUser, close, say }) {
  const [mode, setMode] = useState(user ? 'in' : 'new');
  const [f, setF] = useState({ name: '', email: '', pw: '' });
  const ok =
    mode === 'new'
      ? f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.pw.length >= 8
      : /\S+@\S+\.\S+/.test(f.email) && f.pw.length >= 1;
  return (
    <div className="mm-bg" onClick={close}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-modal-head">
          <h3 className="mm-d" style={{ fontSize: 27 }}>
            {mode === 'in'
              ? 'Your account'
              : mode === 'new'
                ? 'Open an account'
                : 'Sign in'}
          </h3>
          <button onClick={close} aria-label="Close">
            <Icon d="M6 6l12 12M18 6L6 18" s={20} />
          </button>
        </div>
        <div className="mm-modal-body">
          {mode === 'in' ? (
            <div className="mm-stack">
              <div>
                <span className="mm-sc-sm" style={{ color: 'var(--verdant)' }}>
                  Signed in as
                </span>
                <div
                  className="mm-d"
                  style={{
                    fontSize: 32,
                    margin: '8px 0 4px',
                    color: 'var(--rose)',
                  }}
                >
                  {user.name}
                </div>
                <div style={{ color: 'var(--ink-50)', fontSize: 14 }}>
                  {user.email}
                </div>
              </div>
              <div className="mm-aside">
                Your account holds saved dossiers, the drawings we have sent
                you, tasting notes, invoices and the date reserved in your name.
              </div>
              <div className="mm-row">
                <span className="k mm-sc-sm">Dossiers</span>
                <span className="v">1 draft</span>
              </div>
              <div className="mm-row">
                <span className="k mm-sc-sm">Commissions</span>
                <span className="v">None yet</span>
              </div>
              <button
                className="mm-btn"
                style={{ width: '100%' }}
                onClick={() => {
                  setUser(null);
                  setMode('new');
                  say('Signed out.');
                }}
              >
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <div className="mm-stack">
              {mode === 'new' && (
                <div>
                  <label className="mm-lbl mm-sc-sm">Your name</label>
                  <input
                    className="mm-in"
                    value={f.name}
                    onChange={(e) => setF({ ...f, name: e.target.value })}
                    placeholder="Amelia Hartwell"
                  />
                </div>
              )}
              <div>
                <label className="mm-lbl mm-sc-sm">Email</label>
                <input
                  className="mm-in"
                  type="email"
                  value={f.email}
                  onChange={(e) => setF({ ...f, email: e.target.value })}
                  placeholder="amelia@example.com"
                />
              </div>
              <div>
                <label className="mm-lbl mm-sc-sm">Password</label>
                <input
                  className="mm-in"
                  type="password"
                  value={f.pw}
                  onChange={(e) => setF({ ...f, pw: e.target.value })}
                  placeholder={mode === 'new' ? 'Eight characters or more' : ''}
                />
              </div>
              <button
                className="mm-btn mm-btn-rose"
                style={{ width: '100%' }}
                disabled={!ok}
                onClick={() => {
                  setUser({
                    name: f.name || f.email.split('@')[0],
                    email: f.email,
                  });
                  setMode('in');
                  say('Account opened.');
                }}
              >
                <span>{mode === 'new' ? 'Open account' : 'Sign in'}</span>
              </button>
              <button
                className="mm-link mm-sc-sm"
                style={{
                  display: 'block',
                  margin: '0 auto',
                  color: 'var(--verdant)',
                }}
                onClick={() => setMode(mode === 'new' ? 'old' : 'new')}
              >
                {mode === 'new'
                  ? 'Already a client — sign in'
                  : 'New here — open an account'}
              </button>
              <p
                className="mm-sc-sm"
                style={{ textAlign: 'center', color: 'var(--ink-50)' }}
              >
                Demonstration only — nothing is stored or transmitted.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReserveModal({ close, quote, date, tiers, occasion, user, onDone }) {
  const [stage, setStage] = useState('review');
  useEffect(() => {
    if (stage !== 'paying') return;
    const t = setTimeout(() => setStage('done'), 1700);
    return () => clearTimeout(t);
  }, [stage]);
  return (
    <div className="mm-bg" onClick={close}>
      <div
        className="mm-modal mm-modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mm-modal-head">
          <h3 className="mm-d" style={{ fontSize: 27 }}>
            {stage === 'done' ? 'The date is yours' : 'Hold your date'}
          </h3>
          <button onClick={close} aria-label="Close">
            <Icon d="M6 6l12 12M18 6L6 18" s={20} />
          </button>
        </div>
        <div className="mm-modal-body">
          {stage === 'done' ? (
            <div
              style={{ textAlign: 'center', padding: '26px 0' }}
              className="mm-stack"
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Fleuron w={160} />
              </div>
              <h4
                className="mm-d"
                style={{ fontSize: 38, color: 'var(--rose)' }}
              >
                {fmtLong(date)}
              </h4>
              <p
                className="mm-lede"
                style={{ maxWidth: '46ch', margin: '0 auto' }}
              >
                A confirmation is on its way to {user?.email}. We will send your
                drawing within five days and arrange the tasting. The balance of{' '}
                {gbp(quote.balance)} falls due fourteen days before.
              </p>
              <div>
                <button className="mm-btn mm-btn-rose" onClick={onDone}>
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 46,
              }}
              className="mm-rs-grid"
            >
              <div>
                <span className="mm-sc-sm" style={{ color: 'var(--verdant)' }}>
                  The commission
                </span>
                <div style={{ marginTop: 16 }}>
                  <div className="mm-row">
                    <span className="k mm-sc-sm">Occasion</span>
                    <span className="v">{occasion}</span>
                  </div>
                  <div className="mm-row">
                    <span className="k mm-sc-sm">Build</span>
                    <span className="v">
                      {tiers.length} tier · serves ≈ {quote.serves}
                    </span>
                  </div>
                  <div className="mm-row">
                    <span className="k mm-sc-sm">Date</span>
                    <span className="v">{fmtLong(date)}</span>
                  </div>
                  <div className="mm-row">
                    <span className="k mm-sc-sm">Total</span>
                    <span className="v">
                      {quote.poa ? 'On application' : gbp(quote.total)}
                    </span>
                  </div>
                  <div className="mm-row">
                    <span className="k mm-sc-sm">Balance</span>
                    <span className="v">
                      {gbp(quote.balance)} · {fmtLong(addDays(date, -14))}
                    </span>
                  </div>
                </div>
                <div className="mm-invest">
                  <span
                    className="mm-sc-sm"
                    style={{ color: 'var(--verdant)' }}
                  >
                    Deposit today — 30%
                  </span>
                  <b>{gbp(quote.retainer)}</b>
                </div>
                <div className="mm-aside" style={{ marginTop: 22 }}>
                  The deposit takes the date out of the diary and starts the
                  drawing. It is refundable up to twenty-eight days before,
                  after which the sugar work has already begun.
                </div>
              </div>
              <div>
                <span className="mm-sc-sm" style={{ color: 'var(--verdant)' }}>
                  Settlement
                </span>
                <div className="mm-stack" style={{ marginTop: 16 }}>
                  <div>
                    <label className="mm-lbl mm-sc-sm">Card number</label>
                    <input
                      className="mm-in"
                      placeholder="•••• •••• •••• ••••"
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 22 }}>
                    <div style={{ flex: 1 }}>
                      <label className="mm-lbl mm-sc-sm">Expiry</label>
                      <input className="mm-in" placeholder="MM / YY" disabled />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="mm-lbl mm-sc-sm">Security code</label>
                      <input className="mm-in" placeholder="•••" disabled />
                    </div>
                  </div>
                  <div className="mm-aside">
                    Demonstration only — these fields are disabled and no
                    payment is taken. On the live site this panel is Stripe's
                    own hosted card element, so card details never reach the
                    studio's servers.
                  </div>
                  <button
                    className="mm-btn mm-btn-rose"
                    style={{ width: '100%' }}
                    disabled={stage === 'paying'}
                    onClick={() => setStage('paying')}
                  >
                    <span>
                      {stage === 'paying'
                        ? 'Holding the date…'
                        : `Pay deposit · ${gbp(quote.retainer)}`}
                    </span>
                  </button>
                  <p
                    className="mm-sc-sm"
                    style={{ textAlign: 'center', color: 'var(--ink-50)' }}
                  >
                    Apple Pay · Google Pay · Bank transfer
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <style>{`@media (max-width: 780px){ .mm-rs-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </div>
  );
}

function PlateModal({ item, close }) {
  return (
    <div className="mm-bg" onClick={close}>
      <div
        className="mm-modal mm-modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mm-modal-head">
          <h3 className="mm-d" style={{ fontSize: 28 }}>
            Collection {item.n} — {item.name}
          </h3>
          <button onClick={close} aria-label="Close">
            <Icon d="M6 6l12 12M18 6L6 18" s={20} />
          </button>
        </div>
        <div className="mm-modal-body">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 40,
              alignItems: 'center',
            }}
            className="mm-pm-grid"
          >
            <Cartouche>
              <div className="mm-plate">
                <Engraving
                  tiers={[...item.tiers].reverse()}
                  colour={item.colour}
                  accent={item.accent}
                  decor={item.decor}
                  finish="watercolour"
                  width={400}
                  height={460}
                />
                <div className="mm-plate-cap mm-sc-sm">
                  <span>Pl. {item.n}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </Cartouche>
            <div>
              <p className="mm-lede">{item.blurb}</p>
              <div style={{ marginTop: 28 }}>
                {item.pieces.map((p) => (
                  <div className="mm-row" key={p.b}>
                    <span
                      className="k mm-d"
                      style={{ fontSize: 20, color: 'var(--ink)' }}
                    >
                      {p.b}
                    </span>
                    <span className="v">{p.s}</span>
                  </div>
                ))}
              </div>
              <p
                className="mm-sc-sm"
                style={{ marginTop: 26, color: 'var(--ink-50)', lineHeight: 2 }}
              >
                Each piece is a starting point, never a catalogue item.
                <br />
                No two commissions leave the atelier alike.
              </p>
            </div>
          </div>
          <style>{`@media (max-width: 780px){ .mm-pm-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </div>
    </div>
  );
}
