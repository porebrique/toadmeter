!function(a){"use strict";var b,c=a.module("Toadmeter",["ngAria","ngCookies","ngSanitize","ngTouch","ngStorage","angular.filter","ngMaterial","ui.router","mdDateTime","highcharts-ng","restmod","ngFileUpload","LibsModule","AuthModule","UserModule","TransactionModule","TagModule"]);c.appPath="/static/ngapp/app/",c.constant("PROJECT_ROOT_FOLDER",c.appPath),c.constant("APP_ROOT_FOLDER",c.appPath+"scripts/"),c.constant("API_URL","/api/"),c.config(["$mdThemingProvider",function(a){}]),c.config(["$provide","$httpProvider","restmodProvider","API_URL",function(a,c,d,e){c.defaults.xsrfHeaderName="X-CSRFToken",c.defaults.xsrfCookieName="csrftoken",b=d}]),c.run(["$rootScope","$state","$stateParams","$http","$cookies","Auth",function(a,c,d,e,f,g){e.defaults.headers.post["X-CSRFToken"]=f.csrftoken,b.rebase({$config:{style:"DRFAPI",primaryKey:"id",urlPrefix:"/api/"},$hooks:{"after-request-error":function(a){403===a.status&&("demo"===g.getUser().username?g.demoUserRestrictionAlert():(g.clearUser(),c.go("public.login")))},"before-request":function(a){a.url+="/"}}}),a.$state=c,a.$stateParams=d,a.$on("$stateChangeStart",function(){}),a.$on("$stateChangeSuccess",function(b,c){c.data&&(a.currentPageName=c.data.pageName)}),a.$on("$stateChangeError",function(a,b,c,d,e,f){console.log("STATE CHANGE ERROR",f)})}])}(angular),function(a){"use strict";var b=a.module("Toadmeter");b.config(["$urlRouterProvider","$stateProvider","APP_ROOT_FOLDER",function(a,b,c){function d(a,b){return c+a+"/templates/"+b+".html"}a.otherwise("/"),b.state("root",{url:"/","abstract":!0,templateUrl:d("global","root")}).state("public",{"abstract":!0,parent:"root",template:"<ui-view/>",data:{secure:!1}}).state("public.home",{url:"",templateUrl:d("global","home"),data:{pageName:"OH HAI"}}).state("public.userlist",{url:"userlist",template:"<user-list />"}).state("public.reg",{url:"reg",template:"<auth-registration />",data:{pageName:"Registration"}}).state("public.login",{url:"login",template:"<auth-login/>",params:{demo:null},data:{pageName:"Login"}}).state("secure",{parent:"root",template:"<ui-view/>",data:{secure:!0}})}])}(angular),function(a){"use strict";a.module("restmod").factory("DjangoRestfulFrameworkAPI",["restmod","inflector",function(a,b){return a.mixin("DefaultPacker",{$config:{style:"DjangoRestfulFrameworkAPI",primaryKey:"id",jsonMeta:"meta",jsonLinks:"links",urlPrefix:"/api/"},$hooks:{"before-request":function(a){a.url+="/"}},$extend:{Model:{decodeName:b.camelize,encodeName:function(a){return b.parameterize(a,"_")},encodeUrlName:b.parameterize}}})}])}(angular),function(a){"use strict";a.module("LibsModule",[])}(angular),function(a){"use strict";var b=a.module("LibsModule");b.factory("RestmodTemplate",["$filter","restmod",function(b,c){function d(){return{$extend:{Record:{isPending:function(){return this.$pending.length>0},commonInstanceMethod:function(){console.log("this is common instance method, called as $scope.something.instanceMethod()")}},List:{$orderBy:function(a){var c=b("orderBy")(this,a);return this.length=0,this.push.apply(this,c),this},$where:function(a){var c=b("where")(this,a);return this.length=0,this.push.apply(this,c),this}},Model:{getOrCreate:function(b){var c,d=this;return b=parseInt(b,10),c=!isNaN(b)&&a.isNumber(b)?d.$find(b):d.$build()},getFromCollection:function(b,c){var d=null;return a.forEach(b,function(a){a.id===c&&(d=a)}),d},commonModelMethod:function(){console.log("this is common model method,  called as ModelName.instanceMethod() where it is injected")}}}}}function e(b,e){var f=c.model(b),g=a.copy(d(f));return e&&(a.extend(g.$extend.Model,e.$extend.Model),a.extend(g.$extend.Record,e.$extend.Record)),f.mix(g),f}return{provideModel:e}}])}(angular),function(a){"use strict";var b=a.module("LibsModule");b.directive("interactiveHint",["$interpolate","$parse","$timeout",function(a,b,c){return{restrict:"E",template:'<span class="interactive-hint {{hintClass}} {{loadingClass}}"><span class="fa fa-spinner fa-spin"></span><span class="text">{{hintText}}</span></span>',link:function(a,d,e){var f,g=b(e.watch),h=b(e.execute)(a);a.$watch(function(){return g(a)},function(b){b&&(f&&c.cancel(f),f=c(function(){a.loadingClass="is-loading",h(b).then(function(b){a.hintText=b.text,a.hintClass=b.isFree?"ok":"error",a.loadingClass=null})["catch"](function(b){console.log(b),a.hintText=b.config.url+": "+b.status+" "+b.statusText,a.loadingClass=null})},500))})}}}]),b.directive("focusWhen",["$interpolate","$parse","$timeout",function(a,b,c){return{restrict:"A",link:function(a,d,e){var f=b(e.focusWhen);a.$watch(function(){return f(a)},function(a){a&&c(function(){d[0].focus()},50)})}}}]),b.directive("onEnter",[function(){return{restrict:"A",link:function(a,b,c){b.on("keypress",function(d){13===d.keyCode&&a.$apply(function(){a.$eval(c.onEnter),b.blur()})})}}}])}(angular),function(a){"use strict";var b=a.module("LibsModule");b.directive("lbSidenavSwitch",["$mdSidenav",function(a){return{restrict:"A",link:function(b,c){c.on("click",function(){a("left").toggle()})}}}]),b.directive("spinnerWhen",["APP_ROOT_FOLDER",function(b){return{restrict:"A",transclude:!0,scope:{condition:"=spinnerWhen"},template:'<span class="fa fa-spinner fa-spin"></span><span class="original-content" ng-transclude></span>',link:function(b,c,d){var e=a.element(c.children()[0]),f=a.element(c.children()[1]);b.$watch(function(){return b.condition},function(a){a===!0?(e.css("opacity",1),f.css("opacity",0)):a===!1&&(e.css("opacity",0),f.css("opacity",1))})}}}])}(angular),function(a){"use strict";var b=a.module("AuthModule",[]);b.run(["$rootScope","$localStorage","Auth",function(a,b,c){a.$on("$stateChangeStart",function(a,b,d,e,f){c.checkAuthentication(a,b,d,e,f)})}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.factory("Auth",["$http","$rootScope","$cookieStore","$state","$timeout","$localStorage","$mdToast",function(b,c,d,e,f,g,h){function i(){function b(){a.isUndefined(f.auth)&&(f.auth={}),d=f.auth,c.auth=g.auth}var d,e=this,f=g;b(),e.get=function(b){return a.isUndefined(d[b])&&(console.log("und!"),d[b]=!1),d[b]},e.set=function(a,b){d[a]=b},e.reset=function(){delete f.auth,b()}}function j(){return r.get("isLogged")}function k(a){return b.post("/api/reg",a).then(function(a){return a})}function l(a){return b.post("/api/login",a).then(function(a){r.set("isLogged",!0),r.set("user",a.data.user);var b=s?s.name:"secure.costs.list";s=null,e.go(b)})}function m(){r.reset(),f(function(){},500)}function n(){return b["delete"]("/api/logout").then(function(a){m()})["catch"](function(a){console.error("logout errors:",a)})}function o(){return r.get("user")}function p(a,b,c,d,f){b.data.secure&&!j()&&(a.preventDefault(),"login"===d.name?e.reload():(s=b,e.go("public.login")))}function q(){var a=h.simple().position("top right").hideDelay(3e4).action("x").content("You are currently using read-only account that cannot do any changes.");h.show(a)}var r,s=null;return r=new i,{reg:k,login:l,logout:n,getUser:o,clearUser:m,checkAuthentication:p,demoUserRestrictionAlert:q}}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.controller("auth.LogoutCtrl",["$scope","$timeout","$state","Auth",function(a,b,c,d){a.logout=function(){d.logout().then(function(a){c.go("public.home")})}}]),b.controller("auth.LoginCtrl",["$scope","$location","$state","$stateParams","Auth",function(a,b,c,d,e){a.is={saving:!1},a.user={},console.log(d),d.demo&&(a.user={username:"demo",password:"demo"},a.isDemoUser=!0),a.login=function(){a.is.saving=!0,e.login({username:a.user.username,password:a.user.password,remember:a.user.rememberme}).then(function(b){a.is.saving=!1})["catch"](function(b){a.is.saving=!1,403===b.status&&(a.error=b.data),400===b.status&&(a.error=b.data),500===b.status&&(a.error="Server error, sorry")})}}]),b.controller("auth.RegCtrl",["$scope","$location","$state","Auth","User",function(a,b,c,d,e){a.checkUsername=function(a){return e.checkUsername(a)},a.submit=function(){a.error=null,d.reg(a.user).then(function(b){d.login(a.user)})["catch"](function(b){a.error=500===b.status?"KABOOM! 500":b.data})}}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.directive("authLogin",["$location","$state","APP_ROOT_FOLDER","Auth",function(a,b,c,d){return{restrict:"E",templateUrl:c+"auth/templates/login.html",scope:{},controller:"auth.LoginCtrl",link:function(a,b){}}}]),b.directive("authLogout",["$location","$state","APP_ROOT_FOLDER","Auth",function(a,b,c,d){return{restrict:"A",scope:{},controller:"auth.LogoutCtrl",link:function(a,b){b.bind("click",function(b){a.logout()})}}}]),b.directive("authRegistration",["$location","$state","APP_ROOT_FOLDER","Auth",function(a,b,c,d){return{restrict:"E",templateUrl:c+"auth/templates/reg.html",scope:{},controller:"auth.RegCtrl",link:function(){}}}])}(angular),function(a){"use strict";var b=a.module("AuthModule");b.directive("authCurrentUserName",["Auth",function(a){return{restrict:"E",template:"<strong>User: {{user.first_name}}</strong>",link:function(a,b){}}}])}(angular),function(a){"use strict";a.module("UserModule",[])}(angular),function(a){"use strict";var b=a.module("UserModule");b.factory("User",["$http","RestmodTemplate",function(a,b){var c={$extend:{Model:{checkUsername:function(b){return a({url:this.$url()+"/check/",method:"GET",params:{username:b}}).then(function(a){var c={};return a.data>0?(c.isFree=!1,c.text='Username "'+b+'" is already taken'):(c.isFree=!0,c.text='Username "'+b+'" is free'),c})}}}};return b.provideModel("users").mix(c)}])}(angular),function(a){"use strict";var b=a.module("UserModule");b.directive("userList",["$location","$state","APP_ROOT_FOLDER","User",function(a,b,c,d){return{restrict:"E",templateUrl:c+"user/templates/list.html",scope:{},controller:["$scope",function(a){a.ok=!0,a.user=d.$find(1),a.users=d.$collection(),a.users.$refresh(),a.user.$then(function(){}),a.save=function(){a.user.locals={},a.user.locals.isSaving=!0,console.log(a.user),a.user.$save().$then(function(a){console.log("saved",a)})}}],link:function(){}}}])}(angular),function(a){"use strict";a.module("TransactionModule",[])}(angular),function(a){"use strict";var b=a.module("TransactionModule");b.factory("Statistics",["$filter","RestmodTemplate",function(b,c){function d(c,d){var e=a.copy(c);return a.forEach(e,function(b){b.sum=0,a.forEach(d,function(a){a.tag===b.id&&(b.sum=b.sum+a.size)}),b.enabled=!0}),e=b("orderBy")(e,"sum",!0)}function e(b){var c=a.copy(b);return console.log("preparing stats..."),a.forEach(c,function(b){a.isDefined(b.enabled)||(b.enabled=!0)}),c}function f(b,c){var d=[],e=0;return a.forEach(b,function(b){a.isDefined(b.enabled)||(b.enabled=!0),b.enabled&&b.sum>0&&(d.push([b.text,b.sum]),e+=b.sum)}),{total:e,series:d}}function g(b){j=a.copy(b),k=f(a.copy(b))}function h(a,b){var c=k,d={options:{chart:{type:function(){return console.warn("No chart type set!"),null}},title:{text:"Total: "+c.total},xAxis:{type:"category",labels:{rotation:-45,style:{}}},yAxis:{title:null},legend:{enabled:!1},tooltip:{pointFormat:"Total <b>{point.y}</b>"}},size:{height:400,width:500},series:[{name:"Total",data:c.series}]};switch(a){case"column":d.options.chart.type="column",d.series.dataLabels={enabled:!0,rotation:-90,color:"#FFFFFF",align:"right",format:"{point.y}",y:10,style:{fontSize:"13px"}};break;case"pie":d.options.chart.type="pie",d.options.plotOptions={pie:{cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.y}"}}};break;default:console.error("Unsupported chart type:",a)}return d}var i,j=null,k=!1;return i={$extend:{Model:{annotateSum:d,prepareStats:e,updateData:g,getChartConfig:h}}},c.provideModel("stats").mix(i)}]),b.factory("Transaction",["RestmodTemplate",function(a){var b={$extend:{Model:{getCSVUploadUrl:function(){return"/api/transactions/upload/"}}}};return a.provideModel("transactions").mix(b)}])}(angular),function(a){"use strict";var b=a.module("TransactionModule");b.controller("Transaction.ImportCtrl",["$q","$http","$scope","Upload","Transaction",function(a,b,c,d,e){c.format="toshl",c.csv="",c.$watch("files",function(a){a&&a.length&&c.upload()}),c.upload=function(){if(c.error=null,c.message=null,c.files&&c.files.length){var a=c.files[0];d.upload({url:e.getCSVUploadUrl(),fields:{format:c.format},file:a}).success(function(b,d,e,f){c.message=a.name+"  was uploaded, "+b,c.files=null}).error(function(b,d){c.files=null,c.error=!0,c.message=500===d?a.name+"  was not uploaded due to some unexpected error. Is this file really CSV?":b})}}}]),b.controller("Transaction.StatsCtrl",["$q","$scope","$timeout","Statistics","Transaction","Tag",function(a,b,c,d,e,f){function g(){d.updateData(b.tags),b.pieChartConfig=d.getChartConfig("pie",b.stats),b.columnChartConfig=d.getChartConfig("column",b.stats)}a.all([e.$collection({type:"out"}).$refresh().$asPromise(),f.$collection({type:"out"}).$refresh().$asPromise()]).then(function(a){b.tags=d.annotateSum(a[1],a[0]),b.transactions=a[0],g()}),c(function(){b.$watchCollection("transactions",function(a){b.tags=d.annotateSum(b.tags,a),g()})},1e3),b.toggleTag=function(a){g()}}]),b.controller("Transaction.EditCtrl",["$q","$scope","$state","$stateParams","$filter","Auth","Transaction","Tag",function(b,c,d,e,f,g,h,i){var j={"in":"secure.incomes.list",out:"secure.costs.list"};c.getSelectDateText=function(){return"select"===c.datetype?f("date")(c.transaction.date,"dd.MM.yyyy"):"Other date"},c.setDate=function(a){switch(a){case"yesterday":c.transaction.date=moment().subtract(1,"days"),c.datetype="yesterday";break;case"today":c.transaction.date=moment(),c.datetype="today";break;case"select":c.datetype="select",c.datepicker=!1}},c.appendDigit=function(b){var d=c.transaction.size;d=a.isUndefined(d)?"":d.toString(),a.isNumber(b)?d+=b.toString():d=d.substr(0,d.length-1),c.transaction.size=d},c.addTag=function(){if(c.newTagText&&c.newTagText.length>0){{c.tags.$create({text:c.newTagText,type:c.type})}c.newTagText=null}},c.save=function(){c.transaction.type=c.type,c.transaction.date=moment(c.transaction.date).format("YYYY-MM-DD"),c.transaction.$save().$then(function(){d.go(j[c.type])})},c.remove=function(){c.transaction.$destroy().$then(function(){d.go(j[c.type])})},c.transaction=h.getOrCreate(e.transaction_id),c.transaction.$then(function(a){c.setDate(c.transaction.date?"select":"today")}),c.tags=i.$collection({type:c.type}),c.tags.$refresh()}]),b.controller("Transaction.PeriodFilterCtrl",["$q","$scope","$state","$filter","Transaction","Tag",function(a,b,c,d,e,f){function g(){b.period.code="current",b.period.data.month=null,b.period.data.year=moment().year()}function h(){var a=2015,c=moment(),d=[],e=[],f=0;b.period={variants:[["last","Last month"],["current","Current month"],["custom","Choose month"]],data:{},options:{}},g();do d.push(c.year()),c.subtract(1,"year");while(c.year()>=a);do f+=1,e.push(moment().month(f).format("MMMM"));while(12>f);b.period.options.years=d,b.period.options.months=e}h(),b.setPeriod=function(a){if(a!==b.period.code){b.period.code=a,("last"===a||"current"===a)&&b.getOtherMonth(a)}},b.$watch("period.data",function(a){"custom"===b.period.code&&a.year&&a.month&&b.getOtherMonth("custom")},!0),b.getOtherMonth=function(a){var c,d;switch(a){case"last":d=moment().subtract(1,"month"),c=d.month()+1+"."+d.year();break;case"current":c=null,g();break;case"custom":c=parseInt(b.period.data.month,10)+1+"."+b.period.data.year}b.list.$refresh({period:c})}}]),b.controller("Transaction.ListCtrl",["$q","$scope","$state","$filter","Auth","Transaction","Tag",function(b,c,d,e,f,g,h){g.$collection({type:c.type}).$refresh().$then(function(a){c.transactions=a}),c.tags=h.$collection(),c.tags.$refresh(),c.addButtonUrl="in"===c.type?"secure.incomes.edit":"secure.costs.edit",c.getSumFor=function(b){var d=0,f=e("where")(c.transactions,{date:b});return a.forEach(f,function(a){d+=a.size}),d},c.getEditUrlFor=function(a){var b=c.addButtonUrl+"({transaction_id: %id%})";return b=b.replace("%id%",a.id)},c.toggle=function(a){c.openDay=c.openDay===a?null:a},c.getTag=function(a){var b=null;return c.tags.length>0&&(b=h.getFromCollection(c.tags,a)),b}}])}(angular),function(a){"use strict";var b=a.module("TransactionModule");b.directive("transactionPeriodFilter",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/period-filter.html",scope:{list:"="},controller:"Transaction.PeriodFilterCtrl",link:function(){}}}]),b.directive("tmNumpad",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/numpad.html",link:function(){}}}]),b.directive("transactionsImport",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/import.html",controller:"Transaction.ImportCtrl",link:function(){}}}]),b.directive("transactionsStats",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/stats.html",scope:{type:"@"},controller:"Transaction.StatsCtrl",link:function(){}}}]),b.directive("transactionsList",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/list.html",scope:{type:"@"},controller:"Transaction.ListCtrl",link:function(){}}}]),b.directive("transactionEdit",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"transaction/templates/edit.html",scope:{type:"@"},controller:"Transaction.EditCtrl",link:function(){}}}])}(angular),function(a){"use strict";var b=a.module("TransactionModule");b.config(["$stateProvider",function(a){a.state("secure.incomes",{"abstract":!0,url:"incomes/",template:"<ui-view />",data:{}}).state("secure.incomes.list",{url:"list/",template:'<transactions-list type="in"/>',data:{pageName:"Incomes"}}).state("secure.incomes.edit",{url:"edit/:transaction_id",template:'<transaction-edit type="in"/>',data:{pageName:"New record"}}).state("secure.costs",{"abstract":!0,url:"expenses/",template:"<ui-view/>",data:{}}).state("secure.costs.list",{url:"list",template:'<transactions-list type="out"/>',data:{pageName:"Expences"}}).state("secure.costs.edit",{url:"edit/:transaction_id",template:'<transaction-edit type="out"/>',data:{pageName:"New record"}}).state("secure.costs.stats",{url:"stats",template:'<transactions-stats type="out"/>',data:{pageName:"Statistics"}}).state("secure.costs.import",{url:"import",template:"<transactions-import />",data:{pageName:"Import CSV"}})}])}(angular),function(a){"use strict";a.module("TagModule",[])}(angular),function(a){"use strict";var b=a.module("TagModule");b.factory("Tag",["RestmodTemplate",function(a){return a.provideModel("tags")}])}(angular),function(a){"use strict";var b=a.module("TagModule");b.controller("Tag.ListCtrl",["$filter","$scope","Tag",function(a,b,c){b.incomes=c.$collection({type:"in"}),b.expenses=c.$collection({type:"out"}),b.incomes.$refresh(),b.expenses.$refresh()}]),b.controller("Tag.TableCtrl",["$q","$scope","Tag",function(a,b,c){b.deleteTag=function(a){a.$isDeleting=!0,a.$destroy()},b.editTag=function(a){a.$isEdited?(a.$save(["text"]),console.log(a),a.$then(function(b){a.$isEdited=!1}).$catch(function(a){console.log("nope")})):a.$isEdited=!0}}])}(angular),function(a){"use strict";var b=a.module("TagModule");b.directive("tagsList",["APP_ROOT_FOLDER","Tag",function(a,b){return{restrict:"E",templateUrl:a+"tag/templates/list.html",scope:{},controller:"Tag.ListCtrl",link:function(){}}}]),b.directive("tagsListFiltered",["APP_ROOT_FOLDER",function(a){return{restrict:"E",templateUrl:a+"tag/templates/table.html",scope:{tags:"="},controller:"Tag.TableCtrl",link:function(){}}}])}(angular),function(a){"use strict";var b=a.module("TagModule");b.config(["$stateProvider",function(a){a.state("secure.tags",{"abstract":!0,url:"tags/",template:"<ui-view />",data:{}}).state("secure.tags.list",{url:"list/",template:"<tags-list />",data:{pageName:"Список меток"}})}])}(angular);