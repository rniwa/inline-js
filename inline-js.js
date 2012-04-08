#!/usr/local/bin/node

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

    return 0;
}

process.exit(inlineJSMain());
