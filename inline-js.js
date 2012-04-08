#!/usr/local/bin/node

function scriptExecutionEnvironment(window) {
    return function (script) {
        console.log('Executing: ', script);
        console.log(window.document.body.write);
        return eval(script);
    }
}

function inlineJSMain() {
    if (process.argv.length <= 2) {
        console.error("Interactive mode hasn't been implemented");
        return 1;
    }

    var input = process.argv[2];
    var jsdom = require('jsdom');

    var fs = require('fs');
    var inputContent = fs.readFileSync(input);

    jsdom.env({
        html: inputContent,
        done: function (errors, window) {
            // FIXME: Deal with errors.
            var scripts = window.document.getElementsByTagName('script');

            // FIXME: There must be a better way of doing this.
            var evalInWorld = scriptExecutionEnvironment(window);

            for (var i = 0; i < scripts.length; i++) {
                var script = scripts[i];
                if (script.hasAttribute('preprocess')) {
                    window.eval(scripts[i].textContent);
                    script.parentNode.removeChild(script);
                    // FIXME: What if evaluating script changes the order of script elements?
                }
            }

            console.log(window.document.innerHTML);
        }
    });

/*    for (var i = 0; i < process.argv.length; i++) {
        console.log(process.argv[i]);
    }*/

    return 0;
}

process.exit(inlineJSMain());
