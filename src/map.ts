
export class Map {
    private _map: SVGElement
    private _max: number
    /**
     *
     */
    constructor(map: SVGElement, max_width: number) {
        // this.selector = selector;
        // var element = window.document.querySelector(selector) as SVGElement;
        this._map = map;
        this._max = max_width;
        this.validate();
        this.prepare();

    }

    private validate() {

    }
    private prepare() {
        var provinces = this._map.querySelector('g#provinces') as SVGElement;
        // Make all province overlays visible and make all children invisible
        for (let i = 0; i < provinces.children.length; i++) {
            var child = provinces.children[i] as SVGElement;
            child.style.display = 'none';
        }
        provinces.style.display = 'inline';

        var positions = this._map.querySelector('g#unit-positions') as SVGElement;
        console.log(positions)
        positions.style.display = 'none'
    }

    public colorProvince(province: string, color: string): Map {
        var svg = this._map.querySelector(`g#provinces>#${province}`) as SVGElement;
        svg.style.fill = color;
        svg.style.opacity = '0.5';
        svg.style.display = 'inline';
        return this;
    }
    public colorProvinces(provinces: Array<string>, color: string): Map {
        provinces.forEach(province => {
            this.colorProvince(province, color);
        });
        return this;
    }

    public setArmy(province: string, color:string): Map{
        var point = this.getProvinceReferencePoint(province);
        var unit: string =  `
        <path
        id="shadow"
        d="m 3.3791047,33.759657 c -0.185784,-0.110029 -0.368513,-0.181071 -0.406067,-0.157857 -0.1953813,0.120757 0.04926,-0.404731 1.278353,-2.745777 l 1.346228,-2.564197 12.6949103,-3.270268 c 6.982202,-1.798641 12.789944,-3.299673 12.906098,-3.335607 0.159811,-0.04948 0.239659,-0.166188 0.328218,-0.479759 0.06906,-0.244502 0.0856,-0.445776 0.04035,-0.491017 -0.04524,-0.04526 -0.510062,0.116325 -1.133963,0.394154 -0.581506,0.258959 -1.126127,0.470833 -1.210266,0.470833 -0.195054,0 -0.271712,-0.154592 -0.455685,-0.918983 -0.116499,-0.484063 -0.182801,-0.619786 -0.302756,-0.619786 -0.08448,0 -0.798416,0.269263 -1.586535,0.598395 -0.788119,0.329132 -1.502129,0.598416 -1.58669,0.598416 -0.201114,0 -0.327779,-0.248953 -0.388806,-0.764243 -0.04131,-0.348764 -0.02303,-0.433819 0.111178,-0.517475 0.08834,-0.05506 1.50675,-0.684827 3.152028,-1.399505 2.092531,-0.908912 2.999893,-1.343388 3.019627,-1.445827 0.01552,-0.08056 -0.03336,-0.358262 -0.108597,-0.617072 -0.106492,-0.366338 -0.174381,-0.470622 -0.306371,-0.470622 -0.09326,0 -0.600233,0.173099 -1.126613,0.384719 -0.993658,0.399389 -1.214155,0.448467 -1.31097,0.29182 -0.08364,-0.135342 -0.55112,-2.191649 -0.55112,-2.424235 0,-0.108693 0.04809,-0.233795 0.106859,-0.278061 0.05877,-0.04426 2.03033,-0.80552 4.381241,-1.691706 2.350908,-0.886144 4.328676,-1.660458 4.395039,-1.720666 0.102208,-0.09279 0.05319,-0.202017 -0.320577,-0.7142751 -0.242684,-0.332609 -0.441241,-0.662991 -0.441241,-0.734203 0,-0.139052 0.640609,-0.451838 1.073592,-0.524173 0.247386,-0.04134 0.285928,-0.0064 0.716051,0.648745 0.295027,0.449379 0.509632,0.692418 0.611409,0.692418 0.08625,0 2.255539,-0.773275 4.820645,-1.718377 2.565105,-0.945081 4.715819,-1.698427 4.779356,-1.674047 0.07416,0.02847 0.171501,0.401233 0.271841,1.041054 0.08598,0.548192 0.201849,1.058989 0.257497,1.135097 0.09007,0.123173 0.738813,-0.107485 5.909907,-2.101208 3.194795,-1.2317277 5.981385,-2.2983699 6.192413,-2.3703016 0.319539,-0.1088629 0.415202,-0.1955712 0.572157,-0.5186611 0.180532,-0.3715751 0.237852,-0.4113465 1.362162,-0.9451655 0.645534,-0.3064691 1.269497,-0.5634785 1.386578,-0.5711102 0.203838,-0.013297 0.22133,0.026036 0.4118,0.9264459 0.109406,0.5172189 0.254747,1.1228644 0.322981,1.3459106 0.06824,0.2230471 0.147826,0.5788911 0.176865,0.7907647 0.04492,0.3277545 0.03088,0.3852281 -0.0942,0.3852281 -0.08085,0 -0.654872,0.211556 -1.27561,0.4701767 -1.165172,0.4854194 -1.434251,0.5385464 -1.891008,0.3733544 -0.250968,-0.09071 -0.600718,0.04257 -5.592882,2.131694 -2.928845,1.225665 -5.336817,2.2405991 -5.351048,2.2553761 -0.08062,0.08372 -0.05918,0.370133 0.08273,1.105438 0.08727,0.452136 0.137149,0.875311 0.110857,0.940353 -0.0263,0.06506 -2.032791,0.940099 -4.458885,1.944603 -4.280227,1.77214 -4.411078,1.833154 -4.411078,2.056539 0,0.126586 0.248516,1.318458 0.552257,2.648554 0.655929,2.872342 0.730058,3.358016 0.730058,4.782749 0,1.489308 -0.123145,2.369877 -0.486001,3.475189 -0.446135,1.359013 -0.928701,2.142909 -1.929592,3.134544 -0.651828,0.645819 -0.97874,0.897995 -1.496045,1.154093 l -0.661948,0.327669 -1.457753,0 -1.457756,0 -0.59395,-0.295932 c -0.703504,-0.350587 -1.758905,-1.262892 -2.312142,-1.998685 -0.515769,-0.685951 -1.103985,-1.864276 -1.279548,-2.563159 -0.09185,-0.365681 -0.187622,-0.566955 -0.280603,-0.589809 -0.121076,-0.0297 -23.1867973,3.994167 -23.7784853,4.148271 -0.198256,0.05162 -3.170797,2.551288 -3.234281,2.719744 -0.05138,0.136338 -0.477768,0.06345 -0.822217,-0.140578 z"
        style="fill:#000000;fill-opacity:0.53333285"
        inkscape:connector-curvature="0" />
     <path
        style="fill:${color};fill-opacity:1;stroke:#000000;stroke-width:2;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;filter:drop-shadow(0 0 1 #ffffff)"
        d="m 0.51889167,31.580474 c -0.185784,-0.11005 -0.3685137,-0.181091 -0.4060665,-0.157877 -0.1953813,0.120755 0.0492734,-0.404753 1.27835303,-2.745819 L 2.7374056,26.112601 15.432317,22.842333 c 6.9822,-1.798619 12.789945,-3.29963 12.906097,-3.335607 0.159812,-0.04948 0.239661,-0.166166 0.328218,-0.479738 0.06906,-0.244501 0.0856,-0.445775 0.04035,-0.491016 -0.04525,-0.04526 -0.510061,0.116304 -1.133963,0.394132 -0.581509,0.25898 -1.126127,0.470833 -1.210266,0.470833 -0.195054,0 -0.271711,-0.154591 -0.455684,-0.919004 -0.116503,-0.484042 -0.182803,-0.619764 -0.302759,-0.619764 -0.08448,0 -0.798416,0.269283 -1.586535,0.598416 -0.788119,0.32911 -1.502129,0.598416 -1.586687,0.598416 -0.201116,0 -0.32778,-0.248996 -0.388807,-0.764223 -0.0413,-0.348806 -0.02303,-0.433881 0.111179,-0.517517 0.08834,-0.05508 1.506747,-0.684827 3.152026,-1.399483 2.092528,-0.908934 2.999892,-1.343389 3.019626,-1.445849 0.01552,-0.08058 -0.03336,-0.35824 -0.108596,-0.617072 -0.106493,-0.366317 -0.174382,-0.4706 -0.30637,-0.4706 -0.09326,0 -0.600233,0.173119 -1.126613,0.384675 -0.993659,0.399411 -1.214154,0.448511 -1.310969,0.291884 -0.08365,-0.135362 -0.551123,-2.191669 -0.551123,-2.424256 0,-0.108671 0.04809,-0.233816 0.106861,-0.278082 0.05877,-0.04426 2.030331,-0.805519 4.381237,-1.691685 2.35091,-0.8861441 4.328678,-1.6604571 4.395041,-1.7207081 0.102208,-0.09273 0.05319,-0.201974 -0.320575,-0.714254 -0.242687,-0.332587 -0.441241,-0.662991 -0.441241,-0.734202 0,-0.139031 0.640608,-0.451796 1.073589,-0.524173 0.247387,-0.04132 0.285931,-0.0064 0.716052,0.648744 0.295027,0.449401 0.509634,0.692439 0.611409,0.692439 0.08625,0 2.255541,-0.773253 4.820644,-1.7183767 2.565108,-0.9451224 4.71582,-1.6984269 4.779357,-1.6740466 0.07417,0.028474 0.171502,0.4012552 0.271841,1.0410322 0.08598,0.5482143 0.201848,1.0589891 0.257499,1.1350761 0.09007,0.123194 0.738811,-0.107442 5.909906,-2.1011655 3.194797,-1.2317705 5.981383,-2.2984119 6.192414,-2.3702806 0.319536,-0.1088836 0.4152,-0.1956134 0.572155,-0.518661 0.180532,-0.3715959 0.237855,-0.4113888 1.362163,-0.94516564 0.645534,-0.3064897 1.269496,-0.5634992 1.386578,-0.5711731 0.203839,-0.013297 0.221332,0.026081 0.411799,0.9264872 0.109406,0.51719824 0.254748,1.12286544 0.322982,1.34591164 0.06824,0.2230255 0.147825,0.5788695 0.176865,0.7907439 0.04493,0.3277537 0.03088,0.3852272 -0.09419,0.3852272 -0.08085,0 -0.654871,0.2115983 -1.275611,0.4701767 -1.16517,0.4854193 -1.434253,0.5385467 -1.891009,0.3733978 -0.250965,-0.090779 -0.600717,0.042553 -5.59288,2.1316944 -2.928847,1.225663 -5.336816,2.240556 -5.35105,2.255354 -0.08062,0.08374 -0.05918,0.370133 0.08273,1.105417 0.08726,0.4521561 0.13715,0.8753111 0.110858,0.9403521 -0.0263,0.06506 -2.032794,0.940141 -4.458885,1.944625 -4.280228,1.772139 -4.41108,1.833153 -4.41108,2.056518 0,0.126607 0.248517,1.318479 0.552256,2.648574 0.655925,2.872363 0.730058,3.357973 0.730058,4.782728 0,1.48933 -0.123143,2.369877 -0.486001,3.475189 -0.446136,1.359013 -0.928701,2.14293 -1.92959,3.134566 -0.651828,0.645777 -0.978742,0.897973 -1.496045,1.154071 l -0.661949,0.327712 -1.457754,0 -1.457755,0 -0.593949,-0.295997 C 31.52267,29.654082 30.467268,28.741777 29.91403,28.005985 29.398262,27.320054 28.810046,26.14173 28.634483,25.442804 28.542633,25.077166 28.44686,24.87587 28.35388,24.853016 c -0.121075,-0.02972 -23.1867993,3.99419 -23.7784873,4.148251 -0.198255,0.0516 -3.1707958,2.551265 -3.2342808,2.719764 -0.051379,0.136359 -0.47776783,0.06345 -0.82221703,-0.140557 z"
        id="body"
        inkscape:connector-curvature="0" />
        `
        var units = this._map.querySelector('g#units');
       
        var newElem = window.document.createElementNS('http://www.w3.org/2000/svg', 'g') 
        newElem.setAttribute('id', `${province}Army`);
        newElem.style.display = "inline"
        newElem.innerHTML = unit;
        units.appendChild(newElem)
        window.console.log(newElem.getBBox())
        // var factor = this._max / newElem.getBBox().width
        // var factor = 39/1523
        // window.console.log(factor) 
        newElem.setAttribute('width', '39');
        newElem.setAttribute('height', '20');
        // newElem.setAttribute('transform', `translate(${point.x},${point.y}) scale(${factor})`)
        newElem.setAttribute('transform', `translate(${point.x},${point.y})`)
        newElem.style.display = "inline"
        window.console.log(units)
        return this;
    }

    public setFleet(province: string, color:string): Map{
        var point = this.getProvinceReferencePoint(province);
        var unit: string =  `
        <path
     d="m 16.069244,28.911747 1.955223,-0.175768 1.955223,-0.175768 0.427028,-1.217639 c 0.234866,-0.669703 0.440058,-1.560102 0.455981,-1.978667 l 0.02896,-0.761025 0.309336,0.837131 0.309336,0.837126 h 7.276272 0.485879 L 29.082136,25.972728 28.891791,25.668317 H 26.908062 24.92433 V 25.40958 25.150844 l 3.618831,-0.217607 c 1.990359,-0.119684 4.173205,-0.329961 4.850774,-0.467282 l 1.231942,-0.249674 -2.232895,-0.03502 -2.232897,-0.03502 V 23.84183 23.53742 h 2.13585 2.135852 l 0.714159,-0.268372 c 0.392789,-0.147603 1.614504,-0.318835 2.714922,-0.380511 l 2.000765,-0.11214 0.09382,0.799998 0.12782,1.026475 2.7356,0.548336 v -1.400587 -1.400583 l 0.495693,-0.274164 0.49569,-0.274181 -0.536581,-0.203514 -0.536582,-0.203517 0.791192,-0.678969 0.791193,-0.678968 0.121882,-1.217639 0.121881,-1.21764 0.05177,1.445947 0.05177,1.445949 0.384984,0.041 c 0.21174,0.02255 0.800763,0.05681 1.308937,0.0761 l 0.923959,0.03509 0.304021,0.684926 0.304023,0.68492 h 0.542937 0.542939 l 0.0042,-1.750358 c 0.0023,-0.962697 0.08778,-2.058573 0.189919,-2.435281 l 0.185706,-0.684922 h 1.311517 1.311516 l 0.19249,0.951282 c 0.105866,0.523202 0.192491,1.380653 0.192491,1.905439 v 0.954161 l 0.615971,0.380213 0.61597,0.380217 v 1.21506 1.215059 l 0.184891,0.03505 c 0.635221,0.01928 1.432134,0.01278 1.770917,-0.01453 0.338784,-0.02729 0.962454,-0.176025 1.385935,-0.330541 0.42348,-0.15452 1.670823,-0.339585 2.771871,-0.411267 l 2.001905,-0.130332 -0.09173,-0.612679 -0.09173,-0.612674 0.322725,-0.197139 c 0.177497,-0.108429 0.322722,-0.400312 0.322722,-0.648634 v -0.451498 l -5.004769,0.03981 -4.619337,0.03981 -0.0065,-0.255276 c -0.0036,-0.1404 0.09606,-0.577107 0.692521,-0.970457 0.596458,-0.393352 1.50858,-1.078274 2.026944,-1.522052 0.518358,-0.443775 0.262043,-0.152448 -0.569602,0.647394 l -1.512082,1.454258 4.573417,-0.08441 4.573414,-0.08441 0.08647,-3.729023 0.08647,-3.729026 h -0.220619 c -0.12134,0 -0.57092,0.308217 -0.999063,0.684925 l -0.778443,0.684922 0.996364,-1.159762 0.99636,-1.159765 -0.178947,-0.286186 -0.178949,-0.286187 h 0.326159 0.326164 l 0.0498,-2.0547677 0.04979,-2.0547669 0.21793,2.2830756 c 0.119866,1.255693 0.236045,4.500991 0.258188,7.211777 l 0.04025,4.9287 0.307985,0.188135 0.307986,0.188137 v 0.82187 0.821872 l 1.154067,0.08908 0.988273,0.08908 0.102656,0.28872 0.102668,0.28872 0.394195,-0.0041 c 0.875195,-0.0023 1.028103,-0.08676 1.409234,-0.187708 l 0.692968,-0.183552 v -0.707556 -0.707557 l 0.307985,-0.188136 0.307985,-0.188136 v -1.618237 c 0,-0.890033 0.08663,-2.046318 0.192492,-2.569524 l 0.192491,-0.951282 h 1.655422 1.655422 v 1.217641 1.217642 h 0.296117 0.296111 l 0.35486,-1.293745 c 0.195141,-0.711554 0.51885,-1.914648 0.719329,-2.67354 l 0.364501,-1.379802 -0.12387,-1.283787 -0.123869,-1.283786 h -0.565466 -0.565447 l -0.190057,-0.303956 -0.190063,-0.303954 0.71086,0.07565 0.710857,0.07565 0.338076,-4.1095378 c 0.185943,-2.2602452 0.367523,-3.9725518 0.403516,-3.8051271 0.03599,0.1674267 0.04939,1.7085021 0.02978,3.4246141 l -0.03566,3.1202048 h 1.069414 1.069416 l 0.115848,-0.343503 0.115844,-0.3435015 0.339733,1.0940745 0.339723,1.094076 -0.589998,0.185084 -0.589995,0.185084 0.664311,0.531689 0.664324,0.531689 -1.197194,0.71924 -1.197195,0.719246 0.538973,0.118807 c 0.296437,0.06534 0.538976,0.231096 0.538976,0.368333 0,0.137236 -0.207889,0.328368 -0.46198,0.424739 l -0.461977,0.17522 v 1.466824 1.466826 l 0.597985,0.04452 0.597987,0.04452 0.122687,-0.969077 0.122693,-0.969074 0.04928,0.970194 0.04928,0.970196 1.077946,-0.172897 1.077955,-0.172897 v 0.670395 0.67039 l -0.46198,0.456616 c -0.254096,0.251139 -0.461979,0.652308 -0.461979,0.891488 v 0.434871 h 1.077946 1.077946 v 1.369846 1.369845 l 0.846965,-0.04146 0.846956,-0.04146 -0.692959,-0.131927 -0.69297,-0.131913 v -0.89206 -0.892054 h 2.599703 2.599702 l 0.190344,0.304407 0.190345,0.30441 h 2.599702 2.599702 v 0.291076 0.291073 l -2.232895,0.08944 -2.232904,0.08944 -0.05685,0.761028 -0.05684,0.761025 0.160525,-0.553646 0.160525,-0.553642 2.668217,0.168753 c 1.46752,0.0928 2.841556,0.249646 4.239039,0.348516 l 2.540876,0.179764 v 0.281229 0.281229 h -2.1559 -2.155891 v 0.304411 0.304411 h 10.996938 -0.17119 l 0.19034,-0.304411 c 0.1047,-0.167425 0.39006,-0.304411 0.63415,-0.304411 h 0.44381 l 0.005,1.750361 0.005,1.750357 0.23526,0.36582 0.23526,0.36582 3.00047,0.106411 c 1.26549,0.05852 -11.279157,0.109981 -44.395312,0.114351 z m 26.269458,-2.814861 c 0.26373,-0.101629 0.479505,-0.3071 0.479505,-0.456614 v -0.306711 l -1.971391,-0.0061 h -0.705 v 0.491483 0.456616 h 0.225491 c 1.070102,0 1.707665,-0.07706 1.971395,-0.178681 z m 15.622621,-9.827143 c -0.760234,0.651575 -1.185938,0.998158 -1.277112,1.039745 -0.06882,0.03139 0.217983,-0.232878 0.8604,-0.792807 0.600251,-0.568798 1.496915,-1.376636 1.992584,-1.795198 l 1.424144,-1.20813 -1.007428,0.96119 c -0.231687,0.298153 -1.128348,1.105991 -1.992588,1.7952 z"
     id="shadow"
     inkscape:connector-curvature="0"
     inkscape:label="shadow"
     style="display:inline;fill:#000000;fill-opacity:0.47058824;stroke:none;stroke-width:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.47058824" />
  <path
     d="m 15.191256,27.058611 1.955223,-0.175768 1.955223,-0.175768 0.427028,-1.217639 c 0.234866,-0.669703 0.440058,-1.560102 0.455981,-1.978667 l 0.02896,-0.761025 0.309336,0.837131 0.309336,0.837126 h 7.276271 0.485879 l -0.190346,-0.304409 -0.190345,-0.304411 h -1.983729 -1.983731 v -0.258737 -0.258736 l 3.61883,-0.217607 c 1.990359,-0.119684 4.173205,-0.329961 4.850774,-0.467282 l 1.231942,-0.249674 -2.232895,-0.03502 -2.232897,-0.03502 v -0.304411 -0.30441 h 2.13585 2.135852 l 0.714159,-0.268372 c 0.392789,-0.147603 1.614504,-0.318835 2.714922,-0.380511 l 2.000765,-0.11214 0.09382,0.799998 0.12782,1.026475 2.7356,0.548336 V 21.897483 20.4969 l 0.495693,-0.274164 0.49569,-0.274181 -0.536581,-0.203514 -0.536582,-0.203517 0.791192,-0.678969 0.791193,-0.678968 0.121882,-1.217639 0.121881,-1.21764 0.05177,1.445947 0.05177,1.445949 0.384984,0.041 c 0.21174,0.02255 0.800763,0.05681 1.308937,0.0761 l 0.923959,0.03509 0.304021,0.684926 0.304023,0.68492 h 0.542937 0.542939 l 0.0042,-1.750358 c 0.0023,-0.962697 0.08778,-2.058573 0.189919,-2.435281 l 0.185706,-0.684922 h 1.311517 1.311516 l 0.19249,0.951282 c 0.105866,0.523202 0.192491,1.380653 0.192491,1.905439 v 0.954161 l 0.615971,0.380213 0.61597,0.380217 v 1.21506 1.215059 l 0.184891,0.03505 c 0.635221,0.01928 1.432134,0.01278 1.770917,-0.01453 0.338784,-0.02729 0.962454,-0.176025 1.385935,-0.330541 0.42348,-0.15452 1.670823,-0.339585 2.771871,-0.411267 l 2.001905,-0.130332 -0.09173,-0.612679 -0.09173,-0.612674 0.322725,-0.197139 c 0.177497,-0.108429 0.322722,-0.400312 0.322722,-0.648634 v -0.451498 l -5.004769,0.03981 -4.619337,0.03981 -0.0065,-0.255276 c -0.0036,-0.1404 0.09606,-0.577107 0.692521,-0.970457 0.596458,-0.393352 1.50858,-1.078274 2.026944,-1.522052 0.518358,-0.443775 0.262043,-0.152448 -0.569602,0.647394 l -1.512082,1.454258 4.573417,-0.08441 4.573414,-0.08441 0.08647,-3.729023 0.08647,-3.729026 h -0.220619 c -0.12134,0 -0.57092,0.308217 -0.999063,0.684925 l -0.778443,0.684922 0.996364,-1.159762 0.99636,-1.159765 -0.178947,-0.286185 -0.178949,-0.2861871 h 0.326159 0.326164 l 0.0498,-2.054768 0.04979,-2.054767 0.21793,2.283076 c 0.119866,1.255692 0.236045,4.5009901 0.258188,7.2117761 l 0.04025,4.9287 0.307985,0.188135 0.307986,0.188137 v 0.82187 0.821872 l 1.154067,0.08908 0.988273,0.08908 0.102656,0.28872 0.102668,0.28872 0.394195,-0.0041 c 0.875195,-0.0023 1.028103,-0.08676 1.409234,-0.187708 L 67.98984,21.917703 V 21.210147 20.50259 l 0.307985,-0.188136 0.307985,-0.188136 v -1.618237 c 0,-0.890033 0.08663,-2.046318 0.192492,-2.569524 l 0.192491,-0.951282 h 1.655422 1.655422 v 1.217641 1.217642 h 0.296117 0.296111 l 0.35486,-1.293745 c 0.195141,-0.711554 0.51885,-1.914648 0.719329,-2.67354 l 0.364501,-1.379802 -0.12387,-1.283787 -0.123869,-1.283786 H 73.51935 72.953903 l -0.190057,-0.3039551 -0.190063,-0.303954 0.71086,0.07565 0.710857,0.07565 0.338076,-4.109538 c 0.185943,-2.260245 0.367523,-3.9725518 0.403516,-3.8051271 0.03599,0.1674267 0.04939,1.7085021 0.02978,3.4246141 l -0.03566,3.120204 h 1.069414 1.069416 l 0.115848,-0.343502 0.115844,-0.343502 0.339733,1.094075 0.339723,1.094076 -0.589998,0.185084 -0.589995,0.1850831 0.664311,0.53169 0.664324,0.531689 -1.197194,0.719239 -1.197195,0.719246 0.538973,0.118807 c 0.296437,0.06534 0.538976,0.231096 0.538976,0.368333 0,0.137236 -0.207889,0.328368 -0.46198,0.424739 l -0.461977,0.17522 v 1.466824 1.466826 l 0.597985,0.04452 0.597987,0.04452 0.122687,-0.969077 0.122693,-0.969074 0.04928,0.970194 0.04928,0.970196 1.077946,-0.172897 1.077955,-0.172897 v 0.670395 0.67039 l -0.46198,0.456616 c -0.254096,0.251139 -0.461979,0.652308 -0.461979,0.891488 v 0.434871 h 1.077946 1.077946 v 1.369846 1.369845 l 0.846965,-0.04146 0.846956,-0.04146 -0.692959,-0.131927 -0.69297,-0.131913 v -0.89206 -0.892054 h 2.599707 2.5997 l 0.19034,0.304407 0.19035,0.30441 h 2.5997 2.5997 v 0.291076 0.291073 l -2.23289,0.08944 -2.23291,0.08944 -0.0568,0.761028 -0.0568,0.761025 0.16053,-0.553646 0.16052,-0.553642 2.66822,0.168753 c 1.46752,0.0928 2.84156,0.249646 4.23904,0.348516 l 2.54088,0.179764 v 0.281229 0.281229 h -2.15591 -2.15589 v 0.304411 0.304411 h 10.99693 -0.17119 l 0.19034,-0.304411 c 0.1047,-0.167425 0.39006,-0.304411 0.63415,-0.304411 h 0.44381 l 0.005,1.750361 0.005,1.750357 0.23526,0.36582 0.23526,0.36582 3.00047,0.106411 c 1.26549,0.05852 -11.27914,0.109981 -44.395301,0.114351 z M 41.460713,24.24375 c 0.26373,-0.101629 0.479505,-0.3071 0.479505,-0.456614 v -0.306711 l -1.971391,-0.0061 h -0.705 v 0.491483 0.456616 h 0.225491 c 1.070102,0 1.707665,-0.07706 1.971395,-0.178681 z m 15.622621,-9.827143 c -0.760234,0.651575 -1.185938,0.998158 -1.277112,1.039745 -0.06882,0.03139 0.217983,-0.232878 0.8604,-0.792807 0.600251,-0.568798 1.496915,-1.376636 1.992584,-1.795198 l 1.424144,-1.20813 -1.007428,0.96119 c -0.231687,0.298153 -1.128348,1.105991 -1.992588,1.7952 z"
     id="body"
     inkscape:connector-curvature="0"
     inkscape:label="hull"
     style="display:inline;fill:#${color};fill-opacity:1;stroke:#000000;stroke-width:2;stroke-opacity:1"
     sodipodi:insensitive="true" />
      
        `
        var units = this._map.querySelector('g#units');
       
        var newElem = window.document.createElementNS('http://www.w3.org/2000/svg', 'g') 
        newElem.setAttribute('id', `${province}Fleet`);
        newElem.style.display = "inline"
        newElem.innerHTML = unit;
        units.appendChild(newElem)
        window.console.log(newElem.getBBox())
        // var factor = this._max / newElem.getBBox().width
        window.console.log(province, point)
        newElem.setAttribute('width', '53.8px');
        newElem.setAttribute('height', '15px');
        // newElem.setAttribute('transform', `translate(${point.x},${point.y}) scale(${factor})`)
        newElem.setAttribute('transform', `translate(${point.x},${point.y})`)
        newElem.style.display = "inline"
        window.console.log(units)
        return this;
    }

    public getProvinceReferencePoint(province: string): { x: number, y: number } {
        console.log(province)
        // var t = this._map.querySelector(`g.province-centers>#${province}Center`) as SVGRectElement;
        var t = this._map.querySelector(`g#unit-positions>rect#${province}Position`) as SVGRectElement;
        // console.log(t)
        
        console.log(t.attributes.getNamedItem('x'))
        var x: number;
        var y: number;
        x = t.x.baseVal.value;
        y = t.y.baseVal.value;

        // x = t.attributes.getNamedItem('x')<Number></Number>
        // if(t.nodeName == "path"){
        //     var d :string = t.attributes["d"].nodeValue;
            
        //     var parts: Array<string> = d.split(" ");
        //     var moveSet: boolean = false;
        //     for (let i = 0; i < parts.length; i++) {
        //         if(moveSet){
        //             var arr = parts[i].split(",");
        //             x = Number(arr[0]);
        //             y = Number(arr[1]);
        //             break;
        //         }
        //         moveSet = parts[i].toString().toLowerCase() == "m";
        //     }
        // }
        
        return {x: x, y: y};
    }


}
