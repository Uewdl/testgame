var GenDices=pc.createScript("genDices");GenDices.prototype.initialize=function(){},GenDices.prototype.update=function(e){};var Hud=pc.createScript("hud");Hud.prototype.initialize=function(){this.app.on("score",this.onScore,this),this.scoreLabel=this.entity.findByPath("score/inner").findComponent("element"),this.tips=this.entity.findByName("handTips"),this.gameover=this.entity.findByName("gameover"),this.app.on("game:hide-tips",(()=>{this.tips.enabled=!1}),this),this.app.on("restart",(function(){this.tips.enabled=!0,this.scoreLabel.text=0}),this)},Hud.prototype.update=function(t){},Hud.prototype.onScore=function(t){this.scoreLabel.text=t};var GenCube=pc.createScript("genCube");GenCube.attributes.add("dice",{type:"entity",assetType:"render",title:"dices"}),GenCube.attributes.add("stone",{type:"entity",assetType:"render",title:"stone"}),GenCube.attributes.add("boom",{type:"entity",assetType:"render",title:"boom"}),GenCube.attributes.add("spawnpoint",{type:"entity",assetType:"render",title:"Spawn point"}),GenCube.attributes.add("textures",{type:"asset",assetType:"texture",array:!0,title:"Textures"}),GenCube.attributes.add("animation",{type:"entity",assetType:"render",title:"Collapse animation movieclip"}),function(){const t={},i=[],e=2**19;var o={128:0,256:0},s=[];var n={boom:0,stone:0};const a=["boom","cube","stone"];var h=null,c=0,r=!0;function PushRandomNum(t){t>=256&&256==i[i.length-1]||i[i.length-1]<t&&(i.push(2*i[i.length-1]),PushRandomNum(t))}function GetRandomNum(t){var e=i[Math.random()*i.length>>0];return t&&e==t?GetRandomNum(t):e}GenCube.prototype.CollapseAnimation=function(t){var i=new pc.Vec3;this.cameraEntity.camera.worldToScreen(t,i);var e=this.animation.clone();e.enabled=!0;var o=this.app.graphicsDevice.maxPixelRatio;i.x*=o,i.y*=o;var s=this.app.graphicsDevice;this.hud.addChild(e),e.setPosition(i.x/s.width*2-1,2*(1-i.y/s.height)-1,0)},GenCube.prototype.UpdateMaterial=function(i){var e=this.textures[t[i.num]].resource,o=i.findComponents("render");const s=new pc.StandardMaterial;s.diffuseMap=e,s.shininess=45;for(var n=0;n<o.length;++n)for(var a=o[n].meshInstances,h=0;h<a.length;h++)a[h].material=s,s.update()},GenCube.prototype.init=function(){for(this.is_gameover=!1,this.combo_countdown=3,this.combo_count=0,this.can_move=!1,this.offset=0,this.is_shot=!0,this.shot_duration=0,this.instance=null,n={boom:0,stone:0},o={128:0,256:0},s=[],h=null,c=0,r=!0;this.cubes.children.length>0;)this.cubes.children[0].destroy()},GenCube.prototype.initialize=function(){this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouch,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this)),this.pos=new pc.Vec3,this.cameraEntity=this.app.root.findByName("Camera"),this.hud=this.app.root.findByName("2D Screen"),this.leftWallPosX=this.app.root.findByPath("Root/wall/left").getPosition().x+.5,this.rightWallPosX=this.app.root.findByPath("Root/wall/right").getPosition().x-.5,this.sound=this.app.root.findComponent("sound"),this.cubes=this.app.root.findByName("cubes"),this.app.on("gameover",this.onGameOver,this),this.is_gameover=!1,this.init(),this.app.on("restart",(function(){this.init()}),this),this.line=this.app.root.findByPath("Root/line"),this.line.collision.on("triggerenter",(function(t){0==t.cross_the_line?(t.cross_the_line=!0,setTimeout((()=>{t.getPosition().z>=this.line.getPosition().z&&this.app.fire("gameover",c,this.getHiScore())}),200)):this.app.fire("gameover",c,this.getHiScore())}),this),this.app.on("play",this.onPlay,this);for(var e=!1,o=1;!e;)t[2**o]=o-1,o>=19&&(e=!0),o++;i.push(...Object.keys(t).slice(0,6))},GenCube.prototype.getHiScore=function(){return 0},GenCube.prototype.setHiScore=function(t){},GenCube.prototype.onPlay=function(t){this.sound.slots[t].play()},GenCube.prototype.onGameOver=function(){for(this.is_gameover=!0;this.cubes.children.length>0;)this.cubes.children[0].destroy();for(var t in this.sound.slots)this.sound.slots[t].stop()},GenCube.prototype.onCollisioned=function(i,o){if("boom"==o.other.name)return i.destroy(),o.other.destroy(),this.sound.slots.burn.stop(),void this.sound.slots.explode.play();if("cube"==o.other.name&&(o.other.collision_depth<5&&this.sound.slots.hit.play(),i.num==o.other.num)){var n=t[2*i.num];2*i.num>=e&&(n=t[524288]);const a=i.findComponent("render"),h=this.textures[n].resource;a.meshInstances[0].material.diffuseMap=h,a.meshInstances[0].material.update(),i.rigidbody.applyImpulse(new pc.Vec3(0,6,-6)),i.num=2*i.num,-1==s.indexOf(i.num)&&s.push(i.num),this.app.fire("notify","merge",i.num),c+=i.num,this.app.fire("score",c),PushRandomNum(c),o.other.destroy(),this.CollapseAnimation(i.getPosition()),this.sound.slots.collapse.play(),this.combo_countdown=3,this.combo_count++,2==this.combo_count&&(this.sound.slots.combo2.play(),this.app.fire("notify","combo",2)),4==this.combo_count&&(this.sound.slots.combo4.play(),this.app.fire("notify","combo",4)),6==this.combo_count&&(this.sound.slots.combo6.play(),this.app.fire("notify","combo",6)),8==this.combo_count&&(this.sound.slots.combo6.play(),this.app.fire("notify","combo",8))}},GenCube.prototype.update=function(i){if(this.is_shot&&!this.is_gameover){this.is_shot=!1;var e="cube";n.stone>=20&&(e="stone",n.stone=0),n.boom>=40&&(e="boom",this.sound.slots.burn.play(),n.boom=0,n.stone=0),"cube"==e&&(this.instance=this.dice.clone()),"stone"==e&&(this.instance=this.stone.clone()),"boom"==e&&(this.instance=this.boom.clone()),this.instance.collision_depth=0,"cube"==e&&(this.instance.num=GetRandomNum(),o[128]<3?128==this.instance.num&&(this.instance.num=GetRandomNum(128)):o[128]=0,o[256]<6?256==this.instance.num&&(this.instance.num=GetRandomNum(256)):(-1==s.indexOf(256)&&(this.instance.num=GetRandomNum(256)),o[256]=0),this.instance.num in t&&this.UpdateMaterial(this.instance));const i=this.onCollisioned.bind(this,this.instance);this.instance.collision.on("collisionstart",(t=>{i(t)}),this),this.instance.setPosition(new pc.Vec3(0,this.dice.getPosition().y,this.dice.getPosition().z)),this.instance.enabled=!0,this.instance.cross_the_line=!1,this.cubes.addChild(this.instance)}this.shot_duration-=i,this.shot_duration<=0&&(this.shot_duration=0),this.combo_countdown>0?this.combo_countdown-=i:this.combo_count=0,o[128]<3&&(o[128]+=i),o[256]<6&&(o[256]+=i),n.boom+=i,n.stone+=i},GenCube.prototype.onMouseMove=function(t){if(this.can_move&&(this.pos=this.cameraEntity.camera.screenToWorld(t.x,t.y,10),!this.is_shot)){var i=this.pos.x;i<=this.leftWallPosX&&(i=this.leftWallPosX),i>=this.rightWallPosX&&(i=this.rightWallPosX),i-=this.offset,this.instance.setPosition(new pc.Vec3(i,this.instance.getPosition().y,this.instance.getPosition().z))}},GenCube.prototype.onClick=function(){!this.is_shot&&0==this.shot_duration&&this.instance.rigidbody&&(this.instance.rigidbody.type=pc.BODYTYPE_DYNAMIC,this.instance.rigidbody.teleport(this.instance.getPosition()),this.instance.rigidbody.linearVelocity=pc.Vec3.ZERO,this.instance.rigidbody.angularVelocity=pc.Vec3.ZERO,this.shot_duration=.5,clearTimeout(h),h=setTimeout((()=>{this.is_shot=!0}),500),this.instance.rigidbody.applyImpulse(0,0,-10),this.update_collision_depth())},GenCube.prototype.update_collision_depth=function(){this.cubes.children.forEach((t=>{t.collision_depth+=1}))},GenCube.prototype.onTouch=function(t){this.can_move=!1;var i=t.touches[0],e=this.cameraEntity.camera.screenToWorld(i.x,i.y,this.cameraEntity.camera.nearClip),o=this.cameraEntity.camera.screenToWorld(i.x,i.y,this.cameraEntity.camera.farClip),s=this.app.systems.rigidbody.raycastFirst(e,o);s&&(a.indexOf(s.entity.name)>-1&&"dynamic"!=s.entity.rigidbody.type&&(this.can_move=!0,this.offset=e.x-s.entity.getPosition().x),r&&(this.app.fire("game:hide-tips"),r=!1))},GenCube.prototype.onTouchMove=function(t){this.onMouseMove({x:t.touches[0].x,y:t.touches[0].y})},GenCube.prototype.onTouchEnd=function(t){this.can_move&&this.onClick()}}();var Cube=pc.createScript("cube");Cube.prototype.initialize=function(){},Cube.prototype.update=function(e){};var AnimationCollapse=pc.createScript("animationCollapse");const FRAME_RATE=1/24,MAX_FRAME=9;var duration=0,frame=0;AnimationCollapse.prototype.initialize=function(){frame=0,this.element=this.entity.findComponent("element")},AnimationCollapse.prototype.update=function(t){(duration+=t)>=FRAME_RATE&&(duration=0,++frame>=9&&this.entity.destroy()),this.element.spriteFrame=frame};var Notifiction=pc.createScript("notifiction");Notifiction.attributes.add("textures",{type:"asset",assetType:"texture",array:!0,title:"Textures"}),Notifiction.attributes.add("notify",{type:"entity",assetType:"render",title:"notify texture"});const MAX_NOTIFY_NUM=2**18,BASE_OFFSET=8,COMBO_INDEXS={2:11,4:12,6:13,8:14},SHOW_DURATION=1500,NOTIFYS=[];function GetTextureIndex(t){return Math.log2(t)-8}Notifiction.prototype.initialize=function(){this.app.on("notify",this.onNotify,this)},Notifiction.prototype.update=function(t){},Notifiction.prototype.onNotify=function(t,e){var i=-1;if("combo"==t&&e in COMBO_INDEXS&&(i=COMBO_INDEXS[e]),"merge"==t&&e<=262144&&e>=256){if(NOTIFYS.indexOf(e)>-1)return;i=GetTextureIndex(e),NOTIFYS.push(e),this.app.fire("play","combo6")}if(-1!=i){var o=this.notify.clone();o.enabled=!0,o.findComponent("element").texture=this.textures[i].resource,this.entity.addChild(o),setTimeout((()=>{o.destroy()}),1500)}};var AnimationImage=pc.createScript("animationImage");AnimationImage.attributes.add("frames",{type:"number",description:"total frames"}),AnimationImage.attributes.add("perframe",{type:"number",description:"per frame second"}),AnimationImage.prototype.initialize=function(){this.cur_duration=0,this.duration=0,this.cur_frame=0,this.duration=1/this.perframe,this.element=this.entity.element},AnimationImage.prototype.update=function(t){this.cur_duration+=t,this.cur_duration>=this.duration&&(this.cur_duration=0,this.cur_frame++,this.cur_frame>=this.frames&&(this.cur_frame=0),this.element.spriteFrame=this.cur_frame)};var Gameover=pc.createScript("gameover");Gameover.prototype.initialize=function(){this.hi_score=this.entity.findByName("hi score"),this.score=this.entity.findByName("score"),this.btn_replay=this.entity.findByName("replay"),this.btn_respawn=this.entity.findByName("respawn"),this.overlay=this.entity.children[0],this.btn_replay.button.on("click",this.onReplay,this),this.btn_respawn.button.on("click",this.onRespawn,this),this.app.on("gameover",this.onGameover,this),this.mainScene=this.app.scenes.find("main")},Gameover.prototype.update=function(e){},Gameover.prototype.onGameover=function(e,t){this.overlay.enabled=!0,this.hi_score.element.text=t,this.score.element.text=e},Gameover.prototype.onReplay=function(){this.app.fire("restart"),this.overlay.enabled=!1},Gameover.prototype.onRespawn=function(){console.log("respawn")};pc.script.createLoadingScreen((function(e){var t,a;t=["body {","    background-color: #283538;","}","","#application-splash-wrapper {","    position: absolute;","    top: 0;","    left: 0;","    height: 100%;","    width: 100%;","    background-color: #283538;","}","","#application-splash {","    position: absolute;","    top: calc(50% - 28px);","    width: 264px;","    left: calc(50% - 132px);","}","","#application-splash img {","    width: 100%;","}","","#progress-bar-container {","    margin: 20px auto 0 auto;","    height: 2px;","    width: 100%;","    background-color: #1d292c;","}","","#progress-bar {","    width: 0%;","    height: 100%;","    background-color: #f60;","}","","@media (max-width: 480px) {","    #application-splash {","        width: 170px;","        left: calc(50% - 85px);","    }","}"].join("\n"),(a=document.createElement("style")).type="text/css",a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t)),document.head.appendChild(a),function(){var e=document.createElement("div");e.id="application-splash-wrapper",document.body.appendChild(e);var t=document.createElement("div");t.id="application-splash",e.appendChild(t),t.style.display="none";var a=document.createElement("img");a.src="https://playcanvas.com/static-assets/images/play_text_252_white.png",t.appendChild(a),a.onload=function(){t.style.display="block"};var o=document.createElement("div");o.id="progress-bar-container",t.appendChild(o);var p=document.createElement("div");p.id="progress-bar",o.appendChild(p)}(),e.on("preload:end",(function(){e.off("preload:progress")})),e.on("preload:progress",(function(e){var t=document.getElementById("progress-bar");t&&(e=Math.min(1,Math.max(0,e)),t.style.width=100*e+"%")})),e.on("start",(function(){var e=document.getElementById("application-splash-wrapper");e.parentElement.removeChild(e)}))}));