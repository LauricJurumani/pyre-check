(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{77:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return r})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(2),i=n(6),o=(n(0),n(81)),s={id:"pysa-tips",title:"Development Tips",sidebar_label:"Development Tips"},r={unversionedId:"pysa-tips",id:"pysa-tips",isDocsHomePage:!1,title:"Development Tips",description:"Features/Limitations",source:"@site/docs/pysa_tips.md",permalink:"/docs/pysa-tips",editUrl:"https://github.com/facebook/pyre-check/tree/master/documentation/website/docs/pysa_tips.md",sidebar_label:"Development Tips",sidebar:"documentation",previous:{title:"Model Domain Specific Language (DSL)",permalink:"/docs/pysa-model-dsl"},next:{title:"Coverage Increasing Strategies",permalink:"/docs/pysa-coverage"}},l=[{value:"Features/Limitations",id:"featureslimitations",children:[{value:"Inheritance",id:"inheritance",children:[]},{value:"Stubs",id:"stubs",children:[]},{value:"Missing types cause missed flows",id:"missing-types-cause-missed-flows",children:[]},{value:"Globals cause missed flows",id:"globals-cause-missed-flows",children:[]}]},{value:"Helpful Python knowledge",id:"helpful-python-knowledge",children:[]},{value:"Debugging Tools",id:"debugging-tools",children:[{value:"<code>pyre_dump()</code>",id:"pyre_dump",children:[]},{value:"<code>reveal_type(YOUR_VARIABLE)</code>",id:"reveal_typeyour_variable",children:[]},{value:"<code>reveal_taint(YOUR_VARIABLE)</code>",id:"reveal_taintyour_variable",children:[]},{value:"<code>results.json</code>",id:"resultsjson",children:[]},{value:"<code>sapp</code>",id:"sapp",children:[]}]},{value:"Developer Quality-of-Life",id:"developer-quality-of-life",children:[{value:"Iterating quickly with Pysa",id:"iterating-quickly-with-pysa",children:[]},{value:"File Types",id:"file-types",children:[]}]},{value:"Usage Examples",id:"usage-examples",children:[]}],c={rightToc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"featureslimitations"},"Features/Limitations"),Object(o.b)("h3",{id:"inheritance"},"Inheritance"),Object(o.b)("p",null,"Pysa is aware of inheritance, so you can add taint annotations to a base class,\nand Pysa will detect when the tainted attribute or function is accessed via a\nchild class. For example, this flow will be detected during static analysis:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"class Parent:\n    def some_source(self): # Annotated as a source\n        pass\n\nclass Child(Parent):\n    pass\n\nchild = Child()\nsome_sink(child.some_source()) # Detected as a tainted flow\n")),Object(o.b)("p",null,"Additionally, Pysa is aware that child classes can be used anywhere a parent\nclasses's type is present. If you access a method on a parent class and the\nimplementation on any child class returns taint, Pysa will detect that and\ntreat the return from the parent class as tainted. For example, this will be\ndetected as a tainted flow during static analysis:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'class Parent:\n    def some_fn(self):\n        """Benign function with no annotations"""\n        pass\n\nclass Child(Parent):\n    def some_fn(self):\n        """Function returning a tainted value"""\n        return get_some_tainted_value()\n\ndef fn(obj: Parent):\n    some_sink(obj.some_fn()) # Detected as a tainted flow\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"A huge caveat here is that Pysa needs to be aware of these inheritance\nrelationships and function definitions for it to work.")," Code that lives\noutside the repo under analysis might not be visible to Pysa, so these\ninheritances/implementations may be missed. See the Stubs section below for\nmore details."),Object(o.b)("h3",{id:"stubs"},"Stubs"),Object(o.b)("p",null,"The concept of stubs is covered in general ",Object(o.b)("em",{parentName:"p"},Object(o.b)("a",Object(a.a)({parentName:"em"},{href:"/docs/pysa-basics"}),"here")),", but this\nsection in particular will cover specific issues you may encounter with\n",Object(o.b)("inlineCode",{parentName:"p"},".pyi")," stubs. These stubs can be used to prevent pyre errors for types\nthat live outside the codebase you are running Pysa on. The simplest stubs are\njust empty files in the root of the ",Object(o.b)("inlineCode",{parentName:"p"},"stubs")," directory (assuming you have a\n",Object(o.b)("inlineCode",{parentName:"p"},"stubs")," directory specified in the ",Object(o.b)("inlineCode",{parentName:"p"},"search_path")," list in your\n",Object(o.b)("inlineCode",{parentName:"p"},".pyre_configuration")," file). An empty stub basically prevents all type checking\nerrors within the namespace of that stub. So for ",Object(o.b)("inlineCode",{parentName:"p"},"uwsgi.pyi"),", in the ",Object(o.b)("inlineCode",{parentName:"p"},"stubs"),"\ndirectory, the following code would not raise pyre errors (though it would\nobviously fail to run):"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"import uwsgi\nfrom uwsgi import asdf, ZXCV\nuwsgi.qwer()\nvariable = ZXCV()\nvariable.hjkl()\n")),Object(o.b)("p",null,"If you want to be able to create ",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," models (i.e. annotate sources, sinks,\netc.) for something that is outside your codebase, such as Django's\n",Object(o.b)("inlineCode",{parentName:"p"},"django.http.request.HttpRequest")," object, you need more than just an empty stub\nfile. You need a directory structure and ",Object(o.b)("inlineCode",{parentName:"p"},".pyi")," file that matches your import,\nsuch as ",Object(o.b)("inlineCode",{parentName:"p"},"stubs/django/http/request.pyi"),". Within that ",Object(o.b)("inlineCode",{parentName:"p"},".pyi")," file, you\nthen need a stub of the class:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"class HttpRequest(BinaryIO):\n    def __init__(self) -> None: ...\n    COOKIES: Any = ...\n    GET: QueryDict = ...\n    # And a bunch more stuff...\n")),Object(o.b)("p",null,"Only at this point can you add ",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," files with annotations such as these:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"django.http.request.HttpRequest.COOKIES: TaintSource[UserControlled] = ...\ndjango.http.request.HttpRequest.GET: TaintSource[UserControlled] = ...\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"There is a huge gotcha here"),": If you had both an empty ",Object(o.b)("inlineCode",{parentName:"p"},"stubs/django.pyi"),"\nfile, and the ",Object(o.b)("inlineCode",{parentName:"p"},"stubs/django/http/request.pyi")," file shown above, pyre will see\nthe ",Object(o.b)("inlineCode",{parentName:"p"},"django.pyi")," file first and ignore the ",Object(o.b)("inlineCode",{parentName:"p"},"request.pyi")," file. This would mean\nthat your stub of ",Object(o.b)("inlineCode",{parentName:"p"},"HttpRequest")," would be missed, and your ",Object(o.b)("inlineCode",{parentName:"p"},"HttpRequest.COOKIES"),"\nand ",Object(o.b)("inlineCode",{parentName:"p"},"HttpRequest.GET")," annotations would cause errors when running Pysa. The fix\nis simply to delete the ",Object(o.b)("inlineCode",{parentName:"p"},"django.pyi")," file. When deleting that file, you may all\nof a sudden see new typing errors for other types within Django, for which\nyou'll need to add new .",Object(o.b)("inlineCode",{parentName:"p"},"pyi")," files at the appropriate locations."),Object(o.b)("h3",{id:"missing-types-cause-missed-flows"},"Missing types cause missed flows"),Object(o.b)("p",null,"Due to optimizations to allow parallelization, Pysa can be blind in some\nscenarios that might be obvious to a human. Pysa needs to know the type of an\nobject that is a source/sink ",Object(o.b)("em",{parentName:"p"},"at the point at which it is accessed"),", in order\nfor it to detect tainted flows. For example, if you have a function that returns\na wrapper around a source, flows from that source will not be found unless the\nreturn type of the function is specified. See below how one of the flows in the\n",Object(o.b)("inlineCode",{parentName:"p"},"run")," function is missed, simply because the return type on\n",Object(o.b)("inlineCode",{parentName:"p"},"get_wrapper_untyped")," is missing:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'from django.http import HttpRequest\nclass RequestWrapper:\n    request: HttpRequest\n    def __init__(self, request: HttpRequest):\n        self.request = request\n\n    @property\n    def get_request_data(self):\n        return self.request.GET["data"]\n\ndef get_wrapper_untyped(request: HttpRequest):\n    return RequestWrapper(request)\n\ndef get_wrapper_typed(request: HttpRequest) -> RequestWrapper:\n    return RequestWrapper(request)\n\ndef run(request: HttpRequest):\n    # This flow WILL NOT be found\n    wrapper = get_wrapper_untyped(request)\n    eval(wrapper.get_request_data)\n    # This flow WILL be found\n    wrapper = get_wrapper_typed(request)\n    eval(wrapper.get_request_data)\n')),Object(o.b)("p",null,"This illustrates how important typing is for ensuring all flows are caught by\nduring static analysis."),Object(o.b)("h3",{id:"globals-cause-missed-flows"},"Globals cause missed flows"),Object(o.b)("p",null,"To allow for parallel processing, Pysa is limited in it's ability to track taint\nflows through global variables. For example, Pysa will not detect an issue in\nthe following code:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'user_controlled_data = ""\n\ndef load_data(request: HttpRequest) -> None:\n    user_controlled_data = request.GET["data"]\n\ndef run_command(request: HttpRequest) -> None:\n    load_data(request)\n    eval(user_controlled_data)\n')),Object(o.b)("p",null,"The best workaround is to avoid using globals in your code. If a refactor isn't\npossible, but you do know what globals should be considered tainted, you can\nexplicitly declare the global tainted in your ",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," files."),Object(o.b)("h2",{id:"helpful-python-knowledge"},"Helpful Python knowledge"),Object(o.b)("p",null,"Pretty much all python operators are reduced down to double underbar functions.\nFor example, constructing an object results in a call to ",Object(o.b)("inlineCode",{parentName:"p"},"__init__(self, ...)"),"\nand an asterisk operator results in a call to ",Object(o.b)("inlineCode",{parentName:"p"},"__mul__(a, b)"),". A full list of\nthese operators can be found\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.python.org/3.7/library/operator.html"}),"here"),". This is useful to\nknow when you need to add annotations to the usage of operators, such as the use\nof square brackets to access a dictionary."),Object(o.b)("h2",{id:"debugging-tools"},"Debugging Tools"),Object(o.b)("h3",{id:"pyre_dump"},Object(o.b)("inlineCode",{parentName:"h3"},"pyre_dump()")),Object(o.b)("p",null,"You can insert a call to the (non-existent) ",Object(o.b)("inlineCode",{parentName:"p"},"pyre_dump()")," function in your code\nto trigger to pyre to output a ton of metadata about it's current state when it\nparses the that function call. This can be useful as a starting point to figure\nout why something is/isn't happening. This will produce ",Object(o.b)("em",{parentName:"p"},"very")," verbose output."),Object(o.b)("h3",{id:"reveal_typeyour_variable"},Object(o.b)("inlineCode",{parentName:"h3"},"reveal_type(YOUR_VARIABLE)")),Object(o.b)("p",null,"If you only want to check what pyre knows about the types of variables, inject a\ncall to ",Object(o.b)("inlineCode",{parentName:"p"},"reveal_type(YOUR_VARIABLE)")," (no import needed) in your code. Running\nPyre on your code will then give you compact output indicating what Pyre thinks\nthe type of your variable is."),Object(o.b)("h3",{id:"reveal_taintyour_variable"},Object(o.b)("inlineCode",{parentName:"h3"},"reveal_taint(YOUR_VARIABLE)")),Object(o.b)("p",null,"Similarly to ",Object(o.b)("inlineCode",{parentName:"p"},"reveal_type"),", if you only want to check what pyre knows about the\ntaint on variables, inject a call to ",Object(o.b)("inlineCode",{parentName:"p"},"reveal_taint(YOUR_VARIABLE)")," (no import\nneeded) in your code. Running Pysa on your code will then give you compact\noutput indicating what taint Pysa has discovered. Note that each time Pysa\nanalyzes the function (which could be many times) it will update it's\nunderstanding of the taint flowing into the function and output the current\nstate. The final output will be the most complete."),Object(o.b)("h3",{id:"resultsjson"},Object(o.b)("inlineCode",{parentName:"h3"},"results.json")),Object(o.b)("p",null,"Another strategy for getting a bit more metadata is adding a function into your\ncode, which simply constructs and returns the type you want to examine. You can\nthen run Pysa, and grep for the function's name in the\n",Object(o.b)("inlineCode",{parentName:"p"},"results.json")," file located wherever you pointed ",Object(o.b)("inlineCode",{parentName:"p"},"--save-results-to=")," to when\nrunning Pysa. You should then be able to see if that function is detected as\nreturning taint, plus a bit more metadata about it."),Object(o.b)("h3",{id:"sapp"},Object(o.b)("inlineCode",{parentName:"h3"},"sapp")),Object(o.b)("p",null,"The ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/static-analysis-post-processor"}),"Static Analysis Post Processor (SAPP)"),"\nhas access to the same information as ",Object(o.b)("inlineCode",{parentName:"p"},"results.json"),". While SAPP doesn't display\nall the information ",Object(o.b)("inlineCode",{parentName:"p"},"results.json")," contains, it can display the information in a\nmore user-friendly gdb-style way. It's especially useful for exploring flows\nwhich pass through many frames."),Object(o.b)("h2",{id:"developer-quality-of-life"},"Developer Quality-of-Life"),Object(o.b)("h3",{id:"iterating-quickly-with-pysa"},"Iterating quickly with Pysa"),Object(o.b)("p",null,"On large projects, Pysa can take a long time to run; it takes about an hour to\nrun on Instagram, which contains millions of lines of Python code. A few tricks\nto iterate more quickly with Pysa are:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Run in a sample project or test environment.")," Pysa runs much more quickly\non smaller projects, so if you need to test something that isn't specific to\nyour environment (eg. a model that corresponds to code in typeshed) then do\nyour testing in a smaller codebase. Even if you are iterating on something\nspecific to your codebase, it can sometimes be worthwhile to port the code\nsnippet you're working on into a test project.",Object(o.b)("ol",{parentName:"li"},Object(o.b)("li",{parentName:"ol"},"The stub integration tests will validate any stubs in ",Object(o.b)("inlineCode",{parentName:"li"},"tools/pyre/taint"),",\nand this can be a fast shortcut for validating new stubs you want to\nwrite. These tests reside in ",Object(o.b)("inlineCode",{parentName:"li"},"stubs/integration_test")," and can be invoked\nby running ",Object(o.b)("inlineCode",{parentName:"li"},"make stubs_integration_test")," in the root of the repo."),Object(o.b)("li",{parentName:"ol"},"The interprocedural analysis tests dump information about models, issues,\nthe call graph, and overrides. It can be very helpful to test code in this\nenvironment if you need a detailed understanding of Pysa's internal state\nto debug a false positive or negative. Note that these tests do not have\naccess to typeshed or any other type stubs. These tests reside in\n",Object(o.b)("inlineCode",{parentName:"li"},"interprocedural_analyses/taint/test/integration")," and can be invoked by\nrunning ",Object(o.b)("inlineCode",{parentName:"li"},"make test")," in the root of the repo."))),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Skip analysis entirely if you only need to validate taint models"),". ",Object(o.b)("inlineCode",{parentName:"li"},'pyre\nquery "validate_taint_models()"')," can be used to validate taint models without\nhaving to run the entire analysis"),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Filter runs with ",Object(o.b)("inlineCode",{parentName:"strong"},"--rule ####"),".")," This option will cause Pysa to ignore\nsources and sinks that are not involved in the given rule, saving on analysis\ntime. Eg. ",Object(o.b)("inlineCode",{parentName:"li"},"pyre analyze --rule 5000")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Parallelize across machines.")," If working in a could hosted environment,\nreserving a second machine and working on two projects in parallel can be\neffective. As Pysa is running on one machine, you can switch to the other,\nmake changes there, kick off a run, and then switch back to the first to look\nat results."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Put in all debug statements up front.")," When using the debugging tools\noutlined above, put in way more debug statments than you think you need,\ndumping type info and taint for anything remotely related to the flow you're\nlooking at. This will reduce the odds that you need to do a second run to\nfigure out what's going wrong."),Object(o.b)("li",{parentName:"ol"},Object(o.b)("strong",{parentName:"li"},"Enable the ",Object(o.b)("inlineCode",{parentName:"strong"},"--use-cache")," flag.")," All Pysa runs require some information\nfrom Pyre, such as the typechecking environment, dependencies, etc.\nComputing this information can be time-consuming on larger projects.\nHowever, if you're only editing taint models and not the project source,\nthis information isn't expected to change between Pysa runs. By enabling\nthis flag, you can tell Pysa to save this information to a file\n(located at .pyre/pysa.cache) and load from this file in subsequent runs,\nrather than computing it from scratch each time. The cache file will be\ninvalidated if any of the project source files change, in which case\nPysa will fall back to doing a clean run and then saving the computed\nartifacts in a new cache file.")),Object(o.b)("h3",{id:"file-types"},"File Types"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"taint.config")," is a JSON file and ",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," files use Python syntax. If you update\nyour editor to recognize those files as JSON and Python respectively, it'll make\ndevelopment easier."),Object(o.b)("h2",{id:"usage-examples"},"Usage Examples"),Object(o.b)("p",null,"Not all Pysa features will be covered in these docs, and provided examples won't\nalways be complete. Every feature, however, ",Object(o.b)("em",{parentName:"p"},"will")," be covered in the tests\nlocated\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebook/pyre-check/tree/master/interprocedural_analyses/taint/test/integration"}),"here"),".\nThese tests can be a useful resource to discover how to use Pysa features."))}p.isMDXComponent=!0},81:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var a=n(0),i=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),p=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),b=a,h=u["".concat(s,".").concat(b)]||u[b]||d[b]||o;return n?i.a.createElement(h,r(r({ref:t},c),{},{components:n})):i.a.createElement(h,r({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=b;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:a,s[1]=r;for(var c=2;c<o;c++)s[c]=n[c];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);