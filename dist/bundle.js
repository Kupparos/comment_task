(()=>{let e=JSON.parse(localStorage.getItem("comments"))||[];document.addEventListener("DOMContentLoaded",(function(){o(e)}));let t=document.getElementById("comment-form"),n=document.getElementById("author"),i=document.getElementById("comment"),a=document.getElementById("date");function l(){let t=n.value,l=i.value,d=a.value||Date.now(),c=(m=(new Date).getTime(),"undefined"!=typeof performance&&"function"==typeof performance.now&&(m+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=(m+16*Math.random())%16|0;return m=Math.floor(m/16),("x"==e?t:3&t|8).toString(16)})));var m;if(""===n.value)return n.classList.add("invalid"),void(n.nextElementSibling.textContent="Не заполнено");if(""===i.value)return i.classList.add("invalid"),void(i.nextElementSibling.textContent="Не заполнено");let r={id:c,author:t,comment:l,date:d,liked:!1};e.push(r),n.value="",i.value="",a.value="",localStorage.setItem("comments",JSON.stringify(e)),o(e)}function o(e){let t=document.getElementById("comments_title");e.length?t.innerHTML="Комментарии":t.innerHTML="Пока нет комментариев";let n=document.getElementById("comments");n.innerHTML="";for(let t=0;t<e.length;t++){let i=document.createElement("li"),a=document.createElement("h4"),l=document.createElement("p"),o=document.createElement("time"),r=document.createElement("div");r.classList.add("like"),e[t].liked&&r.classList.add("liked");let s=document.createElement("div");s.classList.add("delete"),a.innerText=e[t].author,l.innerText=e[t].comment,o.innerText=m(new Date(e[t].date)),r.addEventListener("click",(function(){e[t].liked=!e[t].liked,d(r),localStorage.setItem("comments",JSON.stringify(e))})),s.addEventListener("click",(function(){c(e[t]),localStorage.setItem("comments",JSON.stringify(e))}));let u=document.createElement("div");u.classList.add("buttons_container"),u.appendChild(r),u.appendChild(s);let x=document.createElement("div");x.classList.add("info_container"),x.appendChild(o),x.appendChild(u),i.appendChild(a),i.appendChild(l),i.appendChild(x),n.appendChild(i),localStorage.setItem("comments",JSON.stringify(e))}}function d(e){e.classList.toggle("liked")}function c(t){let n=e.indexOf(t);n>-1&&(e.splice(n,1),o(e))}function m(e){const t=new Date,n=new Date(t);n.setDate(t.getDate()-1);const i={hour:"numeric",minute:"numeric"};return e.toDateString()===t.toDateString()?`сегодня, ${e.toLocaleTimeString([],i)}`:e.toDateString()===n.toDateString()?`вчера, ${e.toLocaleTimeString([],i)}`:`${e.toLocaleDateString([],{year:"numeric",month:"long",day:"numeric"})}, ${e.toLocaleTimeString([],i)}`}document.getElementById("add-button").addEventListener("click",l),t.addEventListener("submit",(function(e){e.preventDefault(),l()})),[n,i].forEach((e=>{e.addEventListener("input",(t=>{"Enter"!==t.key&&(t.preventDefault(),e.classList.remove("invalid"),e.nextElementSibling.textContent="")}))})),a.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.preventDefault(),l())}))})();