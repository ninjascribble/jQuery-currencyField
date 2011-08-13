(function($) {

    var IS_NUMERIC = /^[0-9\.]+$/;
    
    var defaultOptions = {
        thousands: ',',
        decimal: '.',
        zeroes: 2    
    };
        
    $.fn.currencyField = function(options)
    {
        var opts = this.options = $.extend({}, defaultOptions, options);
        this.bind('paste', function(e) { onPaste(e,opts); });
        this.bind('change', function(e) { onChange(e,opts); });
    };
        
    function isFormattableValue(value)
    {
        value = String(value).match(IS_NUMERIC);
        return Boolean(value);
    }

    function formatValue(value, options)
    {
        var integral = [];
        var decimal = [];
        value = String(value).split('.');
        integral = formatThousands(value[0], options.thousands);
        decimal = formatDecimal(value[1], options.zeroes);
        return integral + options.decimal + decimal;
    }
    
    function formatThousands(value, separator)
    {
        var buf = [];
        value = String(value).split('').reverse();
        for (var i = 0; i < value.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                buf.push(separator);
            }   
            buf.push(value[i]);
        }
        return buf.reverse().join('');
    }
    
    function formatDecimal(value, zeroes)
    {
        value = value || 0;
        value = String(value).substr(0,zeroes);
        zeroes = zeroes - value.length;
        for (zeroes; zeroes > 0; zeroes--) {
            value = value + '0';    
        }
        return value;
    }
        
    function onPaste(evt, options)
    {
        window["currencyField-target"] = evt.target;
        window.setTimeout(function() {
            $(window["currencyField-target"]).trigger("change");
        }, 10);
    }
        
    function onChange(evt, options)
    {
        if (isFormattableValue(evt.target.value)) {
            evt.target.value = formatValue(evt.target.value, options);
        }
    }

}(jQuery));
