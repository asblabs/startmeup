
(function () {
  'use strict';
  angular.module('ng-slide-down', []).directive('ngSlideDown', [
    '$timeout',
    function ($timeout) {
      var getTemplate, link;
      getTemplate = function (tElement, tAttrs) {
        if (tAttrs.lazyRender !== void 0) {
          return '<div ng-if=\'lazyRender\' ng-transclude></div>';
        } else {
          return '<div ng-transclude></div>';
        }
      };
      link = function (scope, element, attrs, ctrl, transclude) {
        var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
        duration = attrs.duration || 1;
        elementScope = element.scope();
        emitOnClose = attrs.emitOnClose;
        onClose = attrs.onClose;
        lazyRender = attrs.lazyRender !== void 0;
        if (lazyRender) {
          scope.lazyRender = scope.expanded;
        }
        closePromise = null;
        element.css({
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionDuration: '' + duration + 's',
          transitionTimingFunction: 'ease-in-out'
        });
        getHeight = function (passedScope) {
          var c, children, height, _i, _len;
          height = 0;
          children = element.children();
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            height += c.clientHeight;
          }
          return '' + height + 'px';
        };
        show = function () {
          if (closePromise) {
            $timeout.cancel(closePromise);
          }
          if (lazyRender) {
            scope.lazyRender = true;
          }
          return element.css('height', getHeight());
        };
        hide = function () {
          element.css('height', '0px');
          if (emitOnClose || onClose || lazyRender) {
            return closePromise = $timeout(function () {
              if (emitOnClose) {
                scope.$emit(emitOnClose, {});
              }
              if (onClose) {
                elementScope.$eval(onClose);
              }
              if (lazyRender) {
                return scope.lazyRender = false;
              }
            }, duration * 1000);
          }
        };
        scope.$watch('expanded', function (value, oldValue) {
          if (value) {
            return $timeout(show);
          } else {
            return $timeout(hide);
          }
        });
        return scope.$watch(getHeight, function (value, oldValue) {
          if (scope.expanded && value !== oldValue) {
            return $timeout(show);
          }
        });
      };
      return {
        restrict: 'A',
        scope: { expanded: '=ngSlideDown' },
        transclude: true,
        link: link,
        template: function (tElement, tAttrs) {
          return getTemplate(tElement, tAttrs);
        }
      };
    }
  ]);
})();

(function() {
	'use strict';
	// Declare app level module which depends on views, and components
	angular.module('myApp', [
      'ngRoute',
      'myApp.view',
      'myApp.version',
      'ngMaterial',
      'ngAnimate',
      'ng-slide-down'
      ])
  .run(function($rootScope, $mdDialog)
  {
    $rootScope.appHidden = true;
    if($rootScope.appHidden)
    {
          $mdDialog.show(
      $mdDialog.alert()
        //.parent(angular.element(document.body))
        .title('Tech Challenge 1!')
        .content('Oops something is not right. Maybe look into the code and try and find what\'s wrong')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        //.targetEvent(ev)
    );
    }
  })
   .controller('quizController', function($scope, $mdDialog, $mdToast){


    $scope.welcomeMessage = 
    [
      ".ynablA ni desab buH ygolonhceT s'BSA fo ruot etavirp a sa llew sa ,senoJ llessuR renniW raeY eht fo OIC 1102 htiw aet gninrom evisulcxe na niw ot ward a otni og lliw egnellahc eht sehsinif ohw enoyreve :taerg era ,revewoh ,sdrawer ehT .gnignellahc erom ylevissergorp emoceb lliw snoitseuq eht ,denraw eb tub – yrtne ruoy etelpmoc ot selzzup cigol nuf fo seires a evlos ,niw ot ni eb oT",
      ".liame yb yaM ht82 yadsruhT no detcatnoc eb lliw srenniW",
      "trats tih dna eman lluf uoy retnE"
    ];

    $scope.quizQuestions = 
    [
      " ?dne eht ni tfel evah uoy od seldnac ynam woh ,seldnac erom yna hsiugnitxe t'nseod dniw eht gnimussA .wodniw eht tuhs uoy ,tuo og semalf erom on erus ekam oT .tuo enog sah eldnac erom eno taht ees uoy ,retal seldnac eht no ni kcab gnikcehC .meht fo owt sehsiugnitxe dna wodniw nepo na hguorht ni swolb ezeerb gnorts A .moor gninid a ni gninrub dnats seldnac neT ",
      " ?enola tsoc skcos eht od hcum woH .skcos eht naht erom srallod 001 stsoc seohs ehT .021$ tsoc skcos fo riap a dna seohs fo riap A ",
      " ?'?' eht si tahW .89 ,? ,88 ,86 ,60 ,61 ",
      " ?eman s'rethguad ht4 eht s'tahW .enuJ ,yaM ,lirpA ,srethguad 4 sah rehtaf s'etaK",
      " .sekatsim etarucca yrev ,tsaf yrev ekam sretupmoC ",
      " ?yadhtrib s'boB si yad tahW .raey a ni yad eno ylno eurt si sihT .82 eb lliw eh raey txen eht dna 52 saw boB yadretsey erofeb yad ehT ",
      " ?smreg owt htiw detrats dah uoy fi raj eht llif ot ekat ti dluow setunim ni gnol woh ,siht gniwonK.ruoh eno yltcaxe ni raj elohw eht llif ot ylpitlum nac mreg elgnis a ,etar siht ta gniunitnoC .smreg ruof fo latot a gnimrof ,niaga tilps hcae smreg owt eht ,taht retfa etunim enO .smreg owt otni stilps mreg eht ,etunim eno retfA .mreg elgnis a sdloh raj ssalg A ",
      " ?htiw nigeb ot ereht erew ssalg fo seceip ynam woH .roolf eht no stnemgarf eerht llits erew ereht ,dne eht nI .meht erofeb tnew reveohw naht seceip erom eerht pu gnikcip hcae ,nrut ni dewollof sdneirf yM .seceip eerht tsrif eht pu dekcip I .sdneirf eerht ym htiw wodniw nekorb siht fo stnemgarf eht pu gninaelc ylluferac saw I  ",
      " ?snioc fo eerht tsuj  gnivom yb sdrawnwod tniop ot ti teg uoy nac woh nialpxe esaelP .elgnairt laretaliuqe gnitniop drawpu na mrof ot degnarra era snioc 01 ",
      " ?gnilbis hcae si dlo woh tsuj oS .ega ruoy semit eerht eb ll'I nehT ?taht fo pot no erom eno em evig tsuj uoy t'nod yhw ,lleW !huh ,ega ym eciwt eb d'uoy ,uoy ot meht evag dna ega ym morf sraey owt yawa koot I fi ,siS ,wonk uoY .gnittahc elbat nehctik eht dnuora gnittis era retsis gib sih dna yob A ",
      " .gniklaw no peek si od ot evah ew lla ,noitcerid thgir eht ni gnicaf era ew fI  ",
      " ?yad eno fo esruoc eht revo wor a ni rebmun emas eht fo erom ro eerht yalpsid kcolc eht lliw semit ynam woH .woleb nwohs eno eht ekil kcolc latigid a enigamI ",
      " .emit yratilim no ton ,elacs ruoh-21 a no emit syalpsid elzzup siht ni kcolc eht ,gnirednow erew uoy esac nI  ",
      " ?edoc taht ni nettirw NOITAVONNI si woH .XFNKNMGBDS sa nettirw si YGOLONHCET edoc niatrec a nI",
      " !niw eht rof skcirevaM sallaD ",
      " .yppah ro lufsseccus eb tonnac uoy srewop nwo ruoy ni ecnedifnoc elbanosaer tub elbmuh a tuohtiW !seitiliba ruoy ni htiaf evaH !flesruoy ni eveileB ",
      " ?retteb ppa siht ekam nac ew kniht uoy od woH ",
      " …si ti ohw uoy llet tsuj thgim I tuo egnellahc siht erugif uoy fi ,hsurc terces a tog ev'I  ",
      " sboJ evetS– .efil s’esle enoemos gnivil ti etsaw t’nod os ,detimil si emit ruoY ",
      " ?noollab der a htiw emoh tnew sdik ynam woh ,siht gniwonK .noollab der a tog sdik eht fo emos ylno ,nerdlihc 01 fo ssalc a nI .noollab eulb a steg t'nseod reveohw dna ,noollab der a steg stah der gniraew elpoep erom ro ruof sees reveohW .gniraew era sdneirf ruoy lla stah eht ta kool dna seye ruoy nepo ,enoyreve ,KO :dias neht dna sdaeh rieht otno spac deppils ehs ,gnikool erew stneduts eht fo enon elihW .seye rieht esolc ssalc reh ni enoyreve dah rehcaet loohcserp A  ",
      " .retal tsevrah lliw uoy ,won tnalp uoy tahW .tseb ruoy od syawlA  ",
      " ?htiw epyt uoy lliw tahw ,'dractiderc' dellac si 'esabatad' dna ,'esabatad' dellac si 'draobyek' ,'draobyek' dellac si 'ifiw' ,'ifiw' dellac si 'yenom' fI",
      " .ht02 eht gnideeccus dna semit 91 gniliaf si ecnarevesreP ",
      " ?rotpursid hcet txen eht si eveileb uoy od tahW ",
      " brevorP esenihC– .won si emit tseb dnoces ehT .oga sraey 02 saw eert a tnalp ot emit tseb ehT ",
      " ZNnahCyaR@ si eldnah rettiwt yM .kcabdeef ruoy raeh ot evol dluow I ",
      " uaerohT divaD yrneH– .denigami evah uoy efil eht eviL  .smaerd ruoy fo noitcerid eht ni yltnedifnoc oG  ",
      " llodniwS selrahC– .ti ot tcaer I woh fo %09 dna em ot sneppah tahw %01 si efiL  ",
      " !poow pooW  ",
      " !setaG lliB txen eht eb thgim yeht wonk uoy lla rof ,sdren eht ot ecin eB ",
      " !had had nud nuD  ",
      " !hoD  ",
      " niawT kraM– .yhw tuo dnif uoy yad eht dna nrob era uoy yad eht era efil ruoy ni syad tnatropmi tsom owt ehT ",
      " trahraE ailemA– .yticanet ylerem si tser eht ,tca ot noisiced eht si gniht tluciffid tsom ehT ",
      " .si GNIMMARGORP EVOL I ecnetnes eht ni drow driht eht fo rettel tsrif eht fo edoc eht neht ,ABUGLC sa dedoc si NOHTYP fI",
      " otalP– .thgil eht fo diarfa era nem nehw si efil fo ydegart laer eht ;krad eht fo diarfa si ohw dlihc a evigrof ylisae nac eW ",
      " !ooooog ti teL !ooooog ti teL ",
      " .serutaef modnar spoleved tsuj tI .sgub sah reven erawtfos yM ",
      " skraP asoR– .raef sehsinimid siht ,pu edam si dnim s’eno nehw taht sraey eht revo denrael evah I  ",
      " ?dnaloR ot og dluohs yenom taht fo hcum woh ,001$ syap tolp erca-01 eht no sdees gniwos fI .seod derflA deeps eht semit eerht ta sdees swos tub ,wolp ot setunim 04 sekat dnaloR .erca rep setunim 02 fo etar a ta dnal eht wolp nac derflA .tsew eht morf derflA dna tsae eht morf strats dnaloR .yltnednepedni krow nac yeht os flah ni ti tilps dna dnal fo tolp erca-01 a dengissa neeb ev'yehT .sdees rewolf wos ot remraf a yb derih neeb evah dnaloR dna derflA  ",
      " yevoC nehpetS– .snoisiced ym fo tcudorp a ma I .secnatsmucric ym fo tcudorp a ton ma I  ",
      " uzT oaL– .eb thgim I tahw emoceb I ,ma I tahw fo og tel I nehW  ",
      " .elgooG s’ereht ,esle gnihtyreve roF .wonk ot tnaem reven saw naM sgniht emoS ",
      " .hguone gnorts si deeccus ot noitanimreted ym fi em ekatrevo reven lliw eruliaF ",
      " tlevesooR ronaelE .elpoep ssucsid sdnim llams ;stneve ssucsid sdnim egareva ;saedi ssucsid sdnim taerG  ",
      " ?dnal yrd ees ot evil lliw elpoep ynam woH .tfar eht no setunim enin sekat taob eht ot kcab dna dnalsi tseraen eht ot pirt-dnuor A .noitseuq eht fo tuo si ytefas ot gnimmiws os ,skrahs gnitae-nam htiw gnimeet era pihs eht dnuora sretaw eht ,esrow srettam ekam oT .lessev rieht no dewots tfar efil nosrep-evif eht si lavivrus rof ecnahc ylno riehT .setunim 02 yltcaxe ni knis ot gniog s'taht pihs a draoba deppart era elpoep neetfiF !SOS  ",
      " !emosewa si gnihtyrevE  ",
      " !emosewa si gnihtyrevE  ",
      " ?redro eht fo kcart peek ot stnaw eh fi rebmun ot evah eh seod sllip ynam woH .ni meht ekat ot sdeen eh redro eht rebmemer mih pleh ot llip hcae no srebmun etirw ot dediced sah nam eht ,emas eht kool lla sllip eht ecniS .redro cificeps a ni meht ekat tsum eh ,llip hcae ni tnereffid si enicidem eht fo noitartnecnoc eht esuaceb tub ,yad a llip eno ekat tsum eh ,yadot gnitratS .sllip 01 debircserp neeb sah nam A  ",
      " yerfniW harpO– .eveileb uoy tahw emoceb uoY ",
      " .0.1 noisrev ti llac ;deeccus t’nod uoy tsrif ta fI ",
      " nilknarF nimajneB– .gnorw ti od ot syaw 001 dnuof tsuj I .tset eht liaf t’ndid I  ",
      " nosremE odlaW hplaR .tnemhsilpmocca tsetaerg eht si esle gnihtemos uoy ekam ot gniyrt yltnatsnoc si taht dlrow a ni flesruoy eb oT  ",
      " uolegnA ayaM– .yawa htaerb ruo ekat taht stnemom eht yb tub ,ekat ew shtaerb fo rebmun eht yb derusaem ton si efiL  ",
      " nietsniE treblA– .eulav fo eb ot rehtar tub ,sseccus a eb ot ton evirtS ",
      " :yas ot dah sdarg ruof eseht tahw s'ereH .ydnac s'yaR eta ydobemoS "
      ]

  $scope.reverseString = function(str)
  {
    //return string in with all words and letters in reverse order i.e. "Bob the builder" becomse "redliub eht bob" 
    return str;
  };

  $scope.calcFibonacci = function(n)
  {
    //return the nth number of a fibonacci sequence
    //FYI [0] = 1st
    //    [1] = 2nd
    //    [5] = 6th
    return 1;
  };

	$scope.startChallenge = function(){
    $scope.showQuestions = true;
    $scope.hideMain = true;
    if($scope.reverseString('ziuq') != 'quiz')
    {
      $mdToast.show(
        $mdToast.simple()
          .content('Great job! But something is still not right, give the Tech Challenge 2 a go!')
          .position('bottom')
          .hideDelay(30000)
      );
    }
    else if($scope.calcFibonacci(1) == 1)
    {
      $mdToast.show(
        $mdToast.simple()
          .content('Great job! You figured out how to reverse the strings but something is still not right, give the Tech Challenge 3 a go!')
          .position('bottom')
          .hideDelay(30000)
      );
    }
	};

  $scope.composeEmail = function()
  {
    $scope.data.Email = "Hi," + "\n" 
    + "I'm " + $scope.data.firstName + " " + $scope.data.lastName + ",\n\n" 
    + "Riddle 1: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(3)]) + "\n"
    + "Answer 1: " + $scope.data.answer1 + "\n"
    + "Riddle 2: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(4)]) + "\n"
    + "Answer 2: " + $scope.data.answer2 + "\n"
    + "Riddle 3: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(5)]) + "\n"
    + "Answer 3: " + $scope.data.answer3 + "\n"
    + "Riddle 4: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(6)]) + "\n"
    + "Answer 4: " + $scope.data.answer4 + "\n"
    + "Riddle 5: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(7)]) + "\n"
    + "Answer 5: " + $scope.data.answer5 + "\n"
    + "Riddle 6: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(8)]) + "\n"
    + "Answer 6: " + $scope.data.answer6 + "\n"
    + "Riddle 7: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(9)]) + "\n"
    + "Answer 7: " + $scope.data.answer7 + "\n"
    + "Riddle 8: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(10)]) + "\n"
    + "Answer 8: " + $scope.data.answer8 + "\n"
    + "Riddle 9: " + $scope.reverseString($scope.quizQuestions[$scope.calcFibonacci(11)]) + "\n"
    + "Answer 9: " + $scope.data.answer9 + "\n"
    + "Why we should hire you? " + "\n"
    + $scope.data.Feedback + "\n"
    ;
  };

$scope.validateAnswer = function(){
    
    if($scope.reverseString('ziuq') != 'quiz')
    {
      $mdToast.show(
        $mdToast.simple()
          .content('Great job! But something is still not right, give the Tech Challenge 2 a go!')
          .position('bottom')
          .hideDelay(30000)
      );
    }
    else if($scope.calcFibonacci(1) == 1)
    {
      $mdToast.show(
        $mdToast.simple()
          .content('Great job! You figured out how to reverse the strings but something is still not right, give the Tech Challenge 3 a go!')
          .position('bottom')
          .hideDelay(30000)
      );
    }
    else
    {
       $scope.data.selectedIndex++;
       $scope.composeEmail();
    }

  };

  $scope.closeApp = function()
  {
    window.close();
  };

	}
   )
   .controller('SideNavController', function($scope, $mdSidenav) {
     $scope.openLeftMenu = function() {
       $mdSidenav('left').toggle();
     };
   })
   .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view'});
   }])
   .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryColor('amber')
    .accentColor('amber');
   });
})();
