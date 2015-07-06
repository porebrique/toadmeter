angular.module('Toadmeter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/static/ngapp/app/scripts/auth/templates/login.html',
    "<form  name=\"loginform\"  ng-submit=\"login()\">\n" +
    "\n" +
    "<div layout=\"row\">\n" +
    "    <div flex-gt-md=\"50\" flex-gt-sm=\"75\" flex-sm>\n" +
    "\n" +
    "\n" +
    "            <div layout=\"row\" layout-sm=\"column\">\n" +
    "                <md-input-container>\n" +
    "                    <label>Username</label>\n" +
    "                    <input ng-model=\"user.username\" type=\"text\"  required />\n" +
    "                </md-input-container>\n" +
    "                <md-input-container>\n" +
    "                    <label>Password</label>\n" +
    "                    <input ng-model=\"user.password\" type=\"password\" required />\n" +
    "                </md-input-container>\n" +
    "            </div>            \n" +
    "\n" +
    "            <div layout=\"row\" style=\"margin: 0 0 1rem 0\">\n" +
    "                <md-checkbox style=\"margin-lefT: 0; margin-top: 0;\" ng-model=\"user.rememberme\" class=\"md-primary\" aria-label=\"User is staff\">Remember me</md-checkbox>\n" +
    "            </div>\n" +
    "        \n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "\n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "<div layout=\"row\" ng-show=\"error\" style=\"margin: -1rem 0 1rem 0;\">\n" +
    "    <div class=\"error\">{{error}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<md-content layout=\"row\">\n" +
    "    <md-divider></md-divider>\n" +
    "    <md-button ng-click=\"save()\" \n" +
    "               ng-disabled=\"loginform.$invalid\"\n" +
    "               class=\"md-primary md-raised\">\n" +
    "        <span spinner-when=\"is.saving\">Log in</span>\n" +
    "    </md-button>\n" +
    "    \n" +
    "    <md-button ui-sref=\"public.reg\" class=\"\">...or you can register</md-button>    \n" +
    "</md-content>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</form>    "
  );


  $templateCache.put('/static/ngapp/app/scripts/auth/templates/logout.html',
    "\n" +
    "<div class=\"panel panel-default\" style=\"width: 400px; margin: 0 auto;\">\n" +
    "\n" +
    "    \n" +
    "\t<div class=\"panel-heading\">\n" +
    "\t\t<div class=\"panel-title\">Вы вышли из админки</div>\n" +
    "\t</div>\n" +
    "    \n" +
    "    <div class=\"panel-body\">\n" +
    "\n" +
    "        \n" +
    "        <p style=\"font-size: 14px;\">\n" +
    "            Туда можно <a ui-sref=\"login\">вернуться</a>, а можно <a href=\"/\">отправиться на сайт</a>.\n" +
    "        </p>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "\n" +
    "\t\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/static/ngapp/app/scripts/auth/templates/reg.html',
    "<form  name=\"regform\" class=\"regform\" ng-submit=\"submit()\">\n" +
    "\n" +
    "<div layout=\"row\">\n" +
    "    <div  flex-sm=\"100\" flex-gt-sm=\"70\" flex-gt-md=\"40\" flex-lg=\"30\">\n" +
    "        <div layout=\"column\">\n" +
    "            <md-input-container>\n" +
    "                <label>Username</label>\n" +
    "                <input name=\"reg-username\" ng-model=\"user.username\" type=\"text\" required/>\n" +
    "                <interactive-hint watch=\"user.username\" execute=\"checkUsername\"></interactive-hint>\n" +
    "<!--                <span class=\"interactive-hint\">Username is already taken</span>-->\n" +
    "            </md-input-container>\n" +
    "            <md-input-container>\n" +
    "                <label>Password</label>\n" +
    "                <input name=\"reg-password\" ng-model=\"user.password\" type=\"password\" required/>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "            <div>\n" +
    "                <div class=\"error\">\n" +
    "                    {{error}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "<!--    <md-divider></md-divider>-->\n" +
    "\n" +
    "            <div layout=\"row\">\n" +
    "                <md-button ng-click=\"save()\" \n" +
    "                           ng-disabled=\"regform.$invalid\"\n" +
    "                           class=\"md-primary md-raised\">\n" +
    "                    <span spinner-when=\"is.saving\">Register</span>\n" +
    "                </md-button>\n" +
    "                <md-button ui-sref=\"public.login\" class=\"\">...or log in</md-button>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "    \n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</form>    "
  );


  $templateCache.put('/static/ngapp/app/scripts/global/templates/datepicker.html',
    "<md-dialog aria-label=\"Datepicker\">\n" +
    "    <md-content class=\"sticky-container\" style=\"padding: 0;\">\n" +
    "<!--        <md-subheader class=\"md-sticky-no-effect\">Datepicker</md-subheader>-->\n" +
    "        <div class=\"dialog-content\">\n" +
    "\n" +
    "            <time-date-picker ng-model=\"lbDatepickerModel\" display-mode=\"date\" on-cancel=\"cancel()\" on-save=\"hide()\"></time-date-picker>\n" +
    "\n" +
    "        </div>\n" +
    "    </md-content>\n" +
    "<!--\n" +
    "    <div class=\"md-actions\" layout=\"row\">\n" +
    "        <md-button ng-click=\"answer('not useful')\">Not Useful</md-button>\n" +
    "        <md-button ng-click=\"answer('useful')\" class=\"md-primary\">Useful</md-button>\n" +
    "    </div>\n" +
    "-->\n" +
    "</md-dialog>"
  );


  $templateCache.put('/static/ngapp/app/scripts/global/templates/home.html',
    "<div layout=\"row\">\n" +
    "    \n" +
    "    <div flex-gt-md=\"70\" flex-gt-lg=\"50\" flex-sm=\"100\">\n" +
    "        \n" +
    "    <p>Have you ever had a feeling \"<em>here is something that I want and can afford, but still it is too expensive, so shouldnt buy it</em>\"? In russian this feeling can be described as \"<em>to be strangled by a toad</em>\". <strong>Toadmeter</strong> is a simple app that can help you to tame this evil toad by controlling your expenses.</p> \n" +
    "        <p>Yes, there are plenty of such apps. I don't pretend this one to be the best, it was developed mostly for experience and for having something to show while say \"I know thing or two about web development\".</p>\n" +
    "    \n" +
    "    <p>Toadmeter can log your incomes and expences (or import them from CSV generated by other apps) and show them as list or as configurable charts.</p>\n" +
    "        \n" +
    "    <div ng-hide=\"auth.isLogged\">\n" +
    "        <p style=\"font-style: italic\">\n" +
    "            To use toadmeter you have to register, but it is simple, just username and password.\n" +
    "        </p>\n" +
    "        <md-button ui-sref=\"public.login\" class=\"md-raised md-primary\">Log in</md-button>\n" +
    "        <md-button ui-sref=\"public.reg\" class=\"md-raised\">Registration</md-button>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "    "
  );


  $templateCache.put('/static/ngapp/app/scripts/global/templates/root.html',
    "<md-sidenav md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-sm')\" class=\"site-sidenav md-sidenav-left md-whiteframe-z2\"\n" +
    "            ng-show=\"auth.isLogged\">\n" +
    "    <md-toolbar class=\"md-default-theme md-hue-0\">\n" +
    "        <h1 class=\"md-toolbar-tools\">Toadmeter</h1>            \n" +
    "    </md-toolbar>\n" +
    "     <md-content>\n" +
    "        <ul class=\"navlinks\">\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"public.home\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-home\"></span> \n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"secure.incomes.list\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-arrow-circle-o-up\"></span>\n" +
    "                    <span class=\"text\">Incomes</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"secure.costs.list\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-arrow-circle-o-down\"></span>\n" +
    "                    <span class=\"text\">Expenses</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"secure.tags.list\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-tags\"></span>\n" +
    "                    <span class=\"text\">Tags</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"secure.costs.stats\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-bar-chart\"></span>\n" +
    "                    <span class=\"text\">Statistics</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li md-ink-ripple>\n" +
    "                <a ui-sref=\"secure.costs.import\" ui-sref-active=\"active\">\n" +
    "                    <span class=\"fa fa-upload\"></span>\n" +
    "                    <span class=\"text\">Import CSV</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "<!--            <li md-ink-ripple><a ui-sref=\"public.userlist\" ui-sref-active=\"active\"><span class=\"fa fa-users\"/> </a></li>-->\n" +
    "            <li md-ink-ripple>\n" +
    "                <a href=\"#\" auth-logout>\n" +
    "                    <span class=\"fa fa-lock\"></span>\n" +
    "                    <span class=\"text\">Logout</span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            \n" +
    "         </ul>\n" +
    "         \n" +
    "    </md-content>         \n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div flex=\"\" role=\"main\" tabindex=\"-1\" layout=\"column\">\n" +
    "    <md-toolbar class=\"md-default-theme\">\n" +
    "        \n" +
    "        <div class=\"md-toolbar-tools\" tabindex=\"0\">\n" +
    "            <md-button ng-show=\"auth.isLogged\"\n" +
    "                       hide-gt-sm lb-sidenav-switch aria-label=\"Toggle menu\" class=\"sidebar-switch\" ng-click=\"toggleNav()\">\n" +
    "                <span class=\"fa fa-bars\"></span>\n" +
    "            </md-button>\n" +
    "            <h1 class=\"fill-height\" flex=\"\" layout=\"row\">{{currentPageName}}</h1>\n" +
    "            \n" +
    "            <span class=\"current-user\" ng-show=\"auth.isLogged\">\n" +
    "                <span ng-show=\"auth.isLogged\"><span class=\"fa fa-user\"></span>{{auth.user.username}}</span>\n" +
    "                <span ng-hide=\"auth.isLogged\">Anonymous</span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        \n" +
    "        \n" +
    "    </md-toolbar>\n" +
    "    <md-content class=\"md-padding\" id=\"main\">\n" +
    "        <ui-view />\n" +
    "    </md-content>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngapp/app/scripts/tag/templates/list.html',
    "<div>\n" +
    "    <md-tabs md-dynamic-height md-center-tabs=\"false\">\n" +
    "        <md-tab>\n" +
    "            <md-tab-label>\n" +
    "                <span class=\"fa fa-arrow-circle-o-down\"></span>\n" +
    "            </md-tab-label>\n" +
    "            <md-tab-body class=\"md-padding\">\n" +
    "                <tags-list-filtered tags=\"expenses\" />\n" +
    "            </md-tab-body>\n" +
    "        </md-tab>\n" +
    "\n" +
    "        <md-tab>\n" +
    "            <md-tab-label>\n" +
    "                <span class=\"fa fa-arrow-circle-o-up\"></span>\n" +
    "            </md-tab-label>\n" +
    "            <md-tab-body class=\"md-padding\">\n" +
    "                <tags-list-filtered tags=\"incomes\" />\n" +
    "            </md-tab-body>\n" +
    "        </md-tab>\n" +
    "    </md-tabs>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/static/ngapp/app/scripts/tag/templates/table.html',
    "<div ng-show=\"tags.length < 1 && tags.$pending.length < 1\">\n" +
    "    There is nothing to show yet. <br/>\n" +
    "    New tags can be added when you log your incomes and expences.\n" +
    "</div> \n" +
    "<table class=\"tm-table tags-list\" ng-show=\"tags.length > 0\">\n" +
    "\n" +
    "        <tr ng-repeat=\"tag in tags\" ng-class=\"{'edit-mode': tag.$isEdited}\">\n" +
    "            \n" +
    "            <td class=\"text-widget\">\n" +
    "                <div class=\"text-input\">\n" +
    "                    <md-input-container>\n" +
    "                        <input focus-when=\"tag.$isEdited\" ng-model=\"tag.text\" type=\"text\" placeholder=\"{{tag.text}}\" on-enter=\"editTag(tag)\" />\n" +
    "                    </md-input-container>        \n" +
    "                </div>                    \n" +
    "                <span class=\"text-display\">{{tag.text}}</span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <span>\n" +
    "                </span>\n" +
    "                \n" +
    "                <span>\n" +
    "                </span>\n" +
    "                <md-button class=\"md-raised\"\n" +
    "                           aria-label=\"edit {{tag.text}}\"\n" +
    "                           ng-click=\"editTag(tag)\">\n" +
    "                    <span class=\"fa fa-pencil\"></span>\n" +
    "                    <span class=\"fa fa-check\"></span>\n" +
    "                </md-button>\n" +
    "                <md-button class=\"md-raised md-warn\"\n" +
    "                           aria-label=\"delete {{tag.text}}\"\n" +
    "                           ng-hide=\"tag.$isEdited\"\n" +
    "                           ng-click=\"deleteTag(tag)\">\n" +
    "                    <span spinner-when=\"tag.$isDeleting\">\n" +
    "                        <span class=\"fa fa-remove\"></span>\n" +
    "                    </span>\n" +
    "                </md-button>                \n" +
    "            </td>\n" +
    "\n" +
    "        </tr>\n" +
    "    </table>"
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/edit.html',
    "<form name=\"transaction_form\" class=\"transaction-edit\">\n" +
    "\n" +
    "<div layout=\"row\">\n" +
    "    <div flex-gt-md=\"50\" flex-gt-sm=\"75\" flex-sm>\n" +
    "<!--    <div style=\"width: 10em\">-->\n" +
    "        <md-content class=\"md-padding\">\n" +
    "            <div layout=\"row\" layout-sm=\"column\">\n" +
    "                <div class=\"sum-input\">\n" +
    "                    <md-input-container>\n" +
    "                        <label>Amount</label>\n" +
    "                        <input name=\"ta_date\" ng-model=\"transaction.size\" type=\"text\" ng-pattern=\"/\\d+/\" required/>\n" +
    "                    </md-input-container>\n" +
    "                    \n" +
    "                    <tm-numpad></tm-numpad>\n" +
    "                     \n" +
    "                </div>  \n" +
    "                <div class=\"date-input\">\n" +
    "                    \n" +
    "                    <div layout=\"row\" layout-align=\"center center\">\n" +
    "                        <md-button type=\"button\" aria-label=\"yesterday\"\n" +
    "                                   ng-class=\"{'md-accent': datetype === 'yesterday'}\"\n" +
    "                                   ng-click=\"setDate('yesterday')\">Yesterday</md-button>\n" +
    "                        <md-button type=\"button\" aria-label=\"today\"\n" +
    "                                   ng-class=\"{'md-accent': datetype === 'today'}\"\n" +
    "                                   ng-click=\"setDate('today')\" >Today</md-button>\n" +
    "                        <md-button type=\"button\" aria-label=\"other date\"\n" +
    "                                   ng-class=\"{'md-accent': datetype === 'select'}\"\n" +
    "                                   ng-click=\"datepicker = !datepicker\">\n" +
    "                            {{getSelectDateText()}}\n" +
    "                        </md-button>\n" +
    "                    </div>\n" +
    "                    <div ng-show=\"datepicker\">\n" +
    "                        <time-date-picker ng-model=\"transaction.date\" \n" +
    "                                          display-mode=\"date\" \n" +
    "                                          on-cancel=\"datepicker = false\" \n" +
    "                                          on-save=\"setDate('select')\"></time-date-picker>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>            \n" +
    "        </md-content>\n" +
    "        \n" +
    "        <md-divider></md-divider>\n" +
    "        \n" +
    "        <md-content class=\"md-padding\" ng-show=\"tags.length > 0\">\n" +
    "            <input type=\"hidden\" ng-model=\"transaction.tag\" required />\n" +
    "            <div style=\"opacity: 0.5;font-size: 0.8rem;\">Select one tag from the list:</div>\n" +
    "            <div  style=\"margin-left: -0.6rem;\">\n" +
    "            <md-button class=\"\" \n" +
    "                       type=\"button\"\n" +
    "                       ng-class=\"{'md-accent': transaction.tag === tag.id}\"\n" +
    "                       ng-repeat=\"tag in tags\" \n" +
    "                       ng-click=\"transaction.tag = tag.id\">{{::tag.text}}</md-button>\n" +
    "            </div>\n" +
    "        </md-content>\n" +
    "        <md-content class=\"new-tag-form\">\n" +
    "            <md-input-container flex>\n" +
    "                    <label ng-show=\"tags.length > 0\">...or type here a new tag</label>\n" +
    "                    <label ng-show=\"tags.length < 1\">There is no tags yet, so type here a new one:</label>\n" +
    "                    <input ng-model=\"newTagText\" type=\"text\" on-enter=\"addTag()\" />\n" +
    "            </md-input-container>        \n" +
    "            <div class=\"inline-ok\">\n" +
    "                <md-button style=\"min-width: auto\"\n" +
    "                           aria-label=\"Добавить метку\" \n" +
    "                           ng-disabled=\"!newTagText || newTagText.length < 1\"\n" +
    "                           ng-click=\"addTag()\">\n" +
    "                    <span class=\"fa fa-check\"></span>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "<!--            <tag-edit-form label=\"...или введите текст новой метки\"/>-->\n" +
    "        </md-content>\n" +
    "        \n" +
    "        <md-divider></md-divider>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "    \n" +
    "<md-content layout=\"row\" class=\"md-padding buttons\" style=\"overflow: visible\">\n" +
    "    <md-button ng-click=\"save()\" \n" +
    "               aria-label=\"save\"\n" +
    "               ng-disabled=\"transaction_form.$invalid || datepicker\"\n" +
    "               class=\"md-primary md-raised\">\n" +
    "        <span ng-show=\"transaction_form.$invalid\">\n" +
    "            <md-tooltip style=\"margin-top: -30px;\">You must enter amount and select one tag</md-tooltip>\n" +
    "        </span>\n" +
    "        <span spinner-when=\"is.saving\">save</span>\n" +
    "    </md-button>\n" +
    "    <md-button ng-click=\"remove()\" \n" +
    "               aria-label=\"delete\"\n" +
    "               ng-if=\"::transaction.id\"\n" +
    "               class=\"md-warn md-raised\">\n" +
    "        <span spinner-when=\"is.deleting\">delete</span>\n" +
    "    </md-button>    \n" +
    "</md-content>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</form>    "
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/import.html',
    "<form name=\"import_form\" class=\"transaction-import\">\n" +
    "\n" +
    "<!--\n" +
    "    <div layout=\"row\">\n" +
    "        <md-radio-group ng-model=\"format\" required>\n" +
    "              <md-radio-button value=\"toshl\" class=\"md-primary\">Toshl</md-radio-button>\n" +
    "        </md-radio-group>\n" +
    "    </div>    \n" +
    "-->\n" +
    "\n" +
    "    \n" +
    "    <div layout=\"column\">\n" +
    "        <div style=\"margin-bottom: 1rem;\" class=\"note\">\n" +
    "            You can upload CSV file here. \n" +
    "            <br/>\n" +
    "            Incomes/expenses with matching date, size and tag will be considered same and ignored.\n" +
    "            <br/>\n" +
    "            Currently only \"toshl finance\" app csv format is supported.\n" +
    "        </div>        \n" +
    "        <div>\n" +
    "            <md-button type=\"button\" class=\"md-raised\" ngf-select ng-model=\"files\"> {{files.length ? files[0].name : 'Select file'}}</md-button>\n" +
    "        </div>\n" +
    "<!--        <div class=\"note\">(currently only <strong>Toshl finance</strong> CSV format is supported)</div>-->\n" +
    "    </div>\n" +
    "    \n" +
    "    <div layout=\"row\" \n" +
    "         ng-show=\"message\" \n" +
    "         ng-class=\"{error: error}\"\n" +
    "         style=\"margin: 1rem 0;\">\n" +
    "        {{message}}\n" +
    "    </div>   \n" +
    "    \n" +
    "<!--\n" +
    "    <div layout=\"row\">\n" +
    "        <md-button\n" +
    "            ng-disabled=\"!(format && files.length)\"\n" +
    "           class=\"md-primary md-raised\"\n" +
    "            type=\"submit\">\n" +
    "            OK\n" +
    "        </md-button>    \n" +
    "    </div>\n" +
    "-->\n" +
    "\n" +
    "</form>\n" +
    "  "
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/list.html',
    "<div class=\"transactions-list\" layout=\"row\">\n" +
    "<div flex-sm=\"100\" flex-md=\"100\" flex-lg=\"80\" flex-gt-lg=\"50\">\n" +
    "    \n" +
    "<div layout=\"column\" layout-gt-md=\"row\" layout-align-md=\"center center\" layout-fill style=\"padding: 0 0.4rem;\">\n" +
    "    <div flex style=\"text-align: center; max-width: 4rem;\">\n" +
    "        <md-button class=\"md-fab md-raised md-primary\" aria-label=\"new transaction\" ui-sref=\"{{::addButtonUrl}}\">\n" +
    "            <span class=\"fa fa-plus\" />\n" +
    "        </md-button>                \n" +
    "    </div>    \n" +
    "    <div flex>\n" +
    "        <transaction-period-filter list=\"transactions\"></transaction-period-filter>\n" +
    "    </div>\n" +
    "</div>    \n" +
    "    \n" +
    "<div layout=\"row\" layout-align-md=\"center center\" ng-show=\"transactions.length < 1\" style=\"margin-top: 2rem;\">\n" +
    "    List is empty. You can log something or select another month.\n" +
    "</div>    \n" +
    "    \n" +
    "<div layout=\"column\">\n" +
    "<!--<div layout=\"column\">    -->\n" +
    "    <div flex=\"30\">\n" +
    "<!--\n" +
    "        <div style=\"text-align: center; margin: 0 0 1.4rem;\">\n" +
    "            <md-button class=\"md-fab md-raised md-primary\" aria-label=\"new transaction\" ui-sref=\"{{::addButtonUrl}}\">\n" +
    "                <span class=\"fa fa-plus\" />\n" +
    "            </md-button>                \n" +
    "        </div>\n" +
    "-->\n" +
    "        <md-card ng-repeat=\"day in transactions | unique: 'date'\" \n" +
    "                 ng-class=\"{open: openDay === day}\"\n" +
    "                 ng-click=\"toggle(day)\">\n" +
    "            <md-card-content>\n" +
    "                <h2 class=\"md-title\">{{::day.date | date: 'dd.MM.yyyy'}}\n" +
    "                    <span class=\"sum\">{{::getSumFor(day.date)}}</span>\n" +
    "                </h2>\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"t in transactions | where: {date: day.date}\">\n" +
    "                        <a ui-sref=\"{{::getEditUrlFor(t)}}\" class=\"ever\">{{::getTag(t.tag).text}}: {{::t.size}}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </md-card-content>\n" +
    "        </md-card>\n" +
    "    </div>\n" +
    "</div>\n" +
    "    \n" +
    "</div>    \n" +
    "</div>    "
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/numpad.html',
    "<div class=\"numpad\" layout=\"column\">\n" +
    "    <div class=\"numpad-row\" layout=\"row\">\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(1)\" tabindex=\"-1\">1</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(2)\" tabindex=\"-1\">2</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(3)\" tabindex=\"-1\">3</md-button>\n" +
    "    </div>\n" +
    "    <div class=\"numpad-row\" layout=\"row\">\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(4)\" tab-index=\"-1\">4</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(5)\">5</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(6)\">6</md-button>\n" +
    "    </div>\n" +
    "    <div class=\"numpad-row\" layout=\"row\">\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(7)\">7</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(8)\">8</md-button>\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(9)\">9</md-button>\n" +
    "    </div>\n" +
    "    <div class=\"numpad-row\" layout=\"row\">\n" +
    "        <md-button class=\"md-raised\" type=\"button\" ng-click=\"appendDigit(0)\">0</md-button>\n" +
    "        <md-button class=\"md-raised backspace\" type=\"button\" aria-label=\"backspace\" ng-click=\"appendDigit(null)\">\n" +
    "            <span class=\"fa fa-arrow-left\" />\n" +
    "        </md-button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/period-filter.html',
    "\n" +
    "<div layout=\"column\" class=\"transaction-period-filter\">\n" +
    "    <div layout=\"row\">\n" +
    "        <md-button ng-repeat=\"variant in ::period.variants\"\n" +
    "                   ng-class=\"{'md-accent': period.code === variant[0]}\"\n" +
    "                   ng-click=\"setPeriod(variant[0])\">\n" +
    "            {{::variant[1]}}\n" +
    "        </md-button>\n" +
    "    </div>        \n" +
    "\n" +
    "    <div ng-show=\"period.code === 'custom'\" layout=\"row\" layout-align=\"end center\">\n" +
    "            <md-select ng-model=\"period.data.year\" placeholder=\"year\">\n" +
    "                <md-option ng-repeat=\"year in period.options.years\" value=\"{{year}}\">{{year}}</md-option>\n" +
    "            </md-select>\n" +
    "            <md-select ng-model=\"period.data.month\" placeholder=\"month\">\n" +
    "                <md-option ng-repeat=\"month in period.options.months\" value=\"{{$index + 1}}\">{{month}}</md-option>\n" +
    "            </md-select>\n" +
    "    </div>  \n" +
    "    \n" +
    "</div>    "
  );


  $templateCache.put('/static/ngapp/app/scripts/transaction/templates/stats.html',
    "<div class=\"stats-page\" ng-cloak layout=\"row\">\n" +
    "    <div layout=\"column\">\n" +
    "        \n" +
    "        \n" +
    "        <div>\n" +
    "            <div layout=\"column\">\n" +
    "                <transaction-period-filter list=\"transactions\"></transaction-period-filter>\n" +
    "            </div>     \n" +
    "            <div ng-show=\"transactions.length < 1 && transactions.$pending.length < 1\">\n" +
    "                <span>There is nothing to show, at least in this month.</span>\n" +
    "<!--                <span ng-show=\"type === 'out'\">Here will be expences statistics. When you log some expences.</span>-->\n" +
    "<!--                <span ng-show=\"type === 'in'\">Here will be incomes statistics. When you log some incomes.</span>-->\n" +
    "            </div>    \n" +
    "\n" +
    "            <md-tabs md-dynamic-height md-border-bottom ng-show=\"transactions.length > 0\">\n" +
    "                <md-tab label=\"<span class='fa fa-pie-chart'></span>\">\n" +
    "                    <md-content class=\"md-padding\">\n" +
    "                         <highchart id=\"stats-pie-chart\" config=\"pieChartConfig\"></highchart>\n" +
    "                    </md-content>\n" +
    "                </md-tab>        \n" +
    "                <md-tab label=\"<span class='fa fa-bar-chart'></span>\">\n" +
    "                    <md-content class=\"md-padding\">\n" +
    "                        <highchart id=\"stats-column-chart\" config=\"columnChartConfig\"></highchart>\n" +
    "                    </md-content>\n" +
    "                </md-tab>\n" +
    "            </md-tabs>\n" +
    "\n" +
    "\n" +
    "            <div class=\"tags\">\n" +
    "                <span class=\"tag\"\n" +
    "                      ng-repeat=\"tag in tags | pick: 'sum > 0'\">\n" +
    "                    <md-checkbox ng-model=\"tag.enabled\" \n" +
    "                                 ng-change=\"toggleTag(tag)\" \n" +
    "                                 class=\"md-primary\" \n" +
    "                                 aria-label=\"Toggle {{::tag.text}}\">\n" +
    "                      {{::tag.text}} ({{::tag.sum}})\n" +
    "                    </md-checkbox>         \n" +
    "        <!--            <span class=\"passive\">{{::tag.text}} ({{::tag.sum}})</span>-->\n" +
    "                </span>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/static/ngapp/app/scripts/user/templates/list.html',
    "userslist\n"
  );

}]);
