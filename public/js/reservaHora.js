
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('selectDocumento'); // Reemplaza con el ID real de tu select

    selectElement.addEventListener('change', (event) => {
        const valorSeleccionado = event.target.value;
        console.log(valorSeleccionado); // Aquí puedes manejar el valor seleccionado
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
      // Prevenir el comportamiento por defecto del envío del formulario
      event.preventDefault();
      
      // Obtener el valor del input de RUT
      const rutPaciente = document.getElementById('rutPaciente').value;
      //console.log(rutPaciente); // Imprimir el RUT por consola
    });
});
  
document.addEventListener('DOMContentLoaded', () => {
    const rutInput = document.getElementById('rutPaciente');
    rutInput.addEventListener('input', (e) => {
        if (e.target.value.length > 9) {
          e.target.value = e.target.value.slice(0, 9);
        }
      });
      rutInput.addEventListener('focus', (e) => {
        let value = e.target.value;
        // Remover puntos y guiones
        value = value.replace(/\./g, '').replace(/\-/g, '');
        // Actualizar el valor del input
        e.target.value = value;
      });
    rutInput.addEventListener('blur', (e) => {
      let value = e.target.value;
  
      // Remover puntos, guiones y limitar a 9 caracteres
      value = value.replace(/\./g, '').replace(/\-/g, '').substring(0, 9);
  
      // Formatear RUT: agregar puntos y guión
      if (value.length > 1) {
        value = value.replace(/^(\d{1,2})(\d{3})?(\d{3})?(\w{0,1})?$/, '$1.$2.$3-$4');
      }
  
      // Reemplazar 0 después del guión por K
      value = value.replace(/-0$/, '-K');
  
      // Actualizar el valor del input con el nuevo formato
      e.target.value = value.replace(/\.$/, '').replace(/\.$/, '').replace(/\.$/, ''); // Eliminar puntos al final
    });
  });

  function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }
  function decrypt(encryptedData) {
    let iv = Buffer.from(encryptedData.iv, 'hex');
    let encryptedText = Buffer.from(encryptedData.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  
  function obtenerRUTLimpio() {
    const rutInput = document.getElementById('rutPaciente');
    let rut = rutInput.value;
  
    // Remover puntos y guiones
    rut = rut.replace(/\./g, '').replace(/\-/g, '');
  
    // Convertir 'K' final en '0'
    if (rut.slice(-1).toUpperCase() === 'K') {
      rut = rut.slice(0, -1) + '0';
    }
  
    return rut;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRut');
    const rutInput = document.getElementById('rutPaciente');
    const txtErrorRut = document.getElementById('txtErrorRut');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Previene el envío por defecto del formulario.
      reservarCita(); // Llama a la función que maneja la reserva y posible redirección.
    });
  });
  
  function reservarCita() {
    var rutPaciente = obtenerRUTLimpio();
    let rutCod = btoa(rutPaciente);
    //let rutDec = atob(rutCod); <= decodificar
    const rutInput = document.getElementById('rutPaciente');
    if (!rutInput.value.trim()) {
      // Si el campo está vacío o solo tiene espacios en blanco
      rutInput.style.borderColor = 'red';
      txtErrorRut.style.color = 'red'; 
      txtErrorRut.classList.remove('d-none');
      txtErrorRut.classList.add('d-block');
    } else {
      // Si el campo no está vacío, realiza la redirección.
      window.location.href = 'http://localhost:3003/mainarea';
    }
  }
  
  
  