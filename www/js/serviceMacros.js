angular.module('serviceMacros', [])

.factory('Macros', function() {

  var macros = [{
    id: 0,
    name: 'Pago',
    txt: 'Actualmente se puede pagar exclusivamente con todos los medios que ofrece Mercado Pago.',
  }, {
    id: 1,
    name: 'Factura',
    txt: 'Sólo emitimos factura a consumidor oficial, Tipo B.',
  }, {
    id: 2,
    name: 'Stock',
    txt: 'Sí, actualmente contamos con stock.',
  }];

  var currentChatID = -1;
  var nextId = -1;

  for (var i = macros.length - 1; i >= 0; i--) {
    if (macros[i].id > nextId) {
      nextId = macros[i].id;
    }
  }

  nextId = nextId + 1;

  return {
    all: function() {
      return macros;
    },
    remove: function(macro) {
      macros.splice(macros.indexOf(macro), 1);
    },
    get: function(macroId) {
      for (var i = 0; i < macros.length; i++) {
        if (macros[i].id === parseInt(macroId)) {
          return macros[i];
        }
      }
      return null;
    },
    create: function (name, txt) {
      return {
        id: -1,
        name: name,
        txt: txt,
      };
    },
    add: function (macro){
      macro.id = nextId; //le asigno un id válido
      nextId = nextId + 1; //incremento next id
      macros.push(macro); //Lo agrego a la lista de chats
    },
    save: function (macro, name, txt){
      macro.name = name;
      macro.txt = txt;
    }
  };

});
