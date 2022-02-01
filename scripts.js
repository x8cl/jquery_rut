$(document).ready(function() {

    // Formateando y validando el RUT por dígito verificador
    //capturo el valor del rut
    $("#rut").on("keyup focusout", function() {
        var rut = $(this).val();
        
        //elimino caracteres no deseados
        rut = rut.replace(/^0+/, ""); //elimino el primer 0
        rut = rut.replace(/\s/g, ""); //elimino los espacios
        rut = rut.replace(/\./g, ""); //elimino los puntos
        rut = rut.replace(/\-/g, ""); //elimino los guiones
        
        //defino el dígito verificador
        var dv = rut.charAt(rut.length-1);

        //defino el rut sin dígito verificador
        var rutSinDV = rut.slice(0, -1);

        //si el rut tiene mas de 7 caracteres, lo formateo en el input #rut
        if (rut.length > 7) {
            var rutOK = rutSinDV + "-" + dv;
            $(this).val(rutOK);
        }

        // Validando el dv
        var suma = 0;
        var multiplicador = 2;
    
        // Para cada dígito en rutSinDV
        for(i = 1; i <= rutSinDV.length; i++) {

            //calculo el digito verificador multiplicado por multiplicador entre 2-7
            suma = suma + rutSinDV.charAt(rutSinDV.length - i) * multiplicador;

            if (multiplicador == 7) {
                multiplicador = 2;
            } else {
                multiplicador++;
            }
        }

        //Calculo el "resto" de la division de la suma / 11
        resultado = suma % 11;

        if (resultado == 1) {
            dvCalculado = "k";
        } else if (resultado == 0) {
            dvCalculado = "0";
        } else {
            dvCalculado = 11-resultado;
        }

        //comparo el dvCalculado con el dv ingresado y habilito el boton "submit" y cambio la carita (Material Icons)
        if (dvCalculado == dv.toLowerCase()) {
            $("input[type='submit']").prop("disabled", false);
            $("#carita").text("sentiment_very_satisfied");
        } else {
            $("input[type='submit']").prop("disabled", true);
            $("#carita").text("sentiment_dissatisfied");
        }

    });

});