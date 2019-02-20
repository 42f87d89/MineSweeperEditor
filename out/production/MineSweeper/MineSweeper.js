if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'MineSweeper'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'MineSweeper'.");
}
var MineSweeper = function (_, Kotlin) {
  'use strict';
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var asList = Kotlin.kotlin.collections.asList_us0mfu$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var List = Kotlin.kotlin.collections.List;
  var Iterator = Kotlin.kotlin.collections.Iterator;
  var Pair = Kotlin.kotlin.Pair;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var split = Kotlin.kotlin.text.split_o64adg$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var unboxChar = Kotlin.unboxChar;
  EditField.prototype = Object.create(ButtonField.prototype);
  EditField.prototype.constructor = EditField;
  SpotState.prototype = Object.create(Enum.prototype);
  SpotState.prototype.constructor = SpotState;
  PlayField.prototype = Object.create(ButtonField.prototype);
  PlayField.prototype.constructor = PlayField;
  var Array_0 = Array;
  function ButtonField(field, buttons) {
    if (buttons === void 0) {
      var array = Array_0(field.height);
      var tmp$;
      tmp$ = array.length - 1 | 0;
      for (var i = 0; i <= tmp$; i++) {
        var array_0 = Array_0(field.width);
        var tmp$_0;
        tmp$_0 = array_0.length - 1 | 0;
        for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
          var tmp$_1;
          array_0[i_0] = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
        }
        array[i] = asList(array_0);
      }
      buttons = asList(array);
    }
    this.field_flcg4a$_0 = field;
    this.buttons = buttons;
  }
  Object.defineProperty(ButtonField.prototype, 'field', {
    get: function () {
      return this.field_flcg4a$_0;
    }
  });
  ButtonField.prototype.clicked_vux9f0$ = function (x, y) {
    makeRandom(this.field, x, y);
    unhide(this.field, x, y);
    ensureNotNull(document.body).removeChild(ensureNotNull(document.getElementById('Minefield')));
    (new PlayField(this.field)).setUpField();
  };
  ButtonField.prototype.doubleClicked_vux9f0$ = function (x, y) {
  };
  ButtonField.prototype.updateButtons = function () {
    var tmp$, tmp$_0;
    tmp$ = this.field.height;
    for (var y = 0; y < tmp$; y++) {
      tmp$_0 = this.field.width;
      for (var x = 0; x < tmp$_0; x++) {
        this.updateButton_vux9f0$(x, y);
      }
    }
  };
  ButtonField.prototype.updateButton_vux9f0$ = function (x, y) {
    var spot = this.field.get_za3lpa$(y).get_za3lpa$(x);
    var button = this.buttons.get_za3lpa$(y).get_za3lpa$(x);
    button.textContent = getMines(this.field, x, y).toString();
    if (spot.state === SpotState$Shown_getInstance())
      if (spot.mine)
        button.id = 'mine';
      else if (getMines(this.field, x, y) === 0)
        button.id = 'zero';
      else
        button.id = 'empty';
    else if (spot.state === SpotState$Flagged_getInstance())
      button.id = 'flag';
    else
      button.id = 'hidden';
  };
  function ButtonField$setUpField$lambda(closure$col, closure$row, this$ButtonField) {
    return function (it) {
      this$ButtonField.clicked_vux9f0$(closure$col, closure$row);
      return Unit;
    };
  }
  function ButtonField$setUpField$lambda_0(closure$col, closure$row, this$ButtonField) {
    return function (it) {
      this$ButtonField.doubleClicked_vux9f0$(closure$col, closure$row);
      return Unit;
    };
  }
  ButtonField.prototype.setUpField = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var main = Kotlin.isType(tmp$ = document.createElement('div'), HTMLDivElement) ? tmp$ : throwCCE();
    main.id = 'Minefield';
    tmp$_0 = this.field.size;
    for (var row = 0; row < tmp$_0; row++) {
      var curRow = Kotlin.isType(tmp$_1 = document.createElement('div'), HTMLDivElement) ? tmp$_1 : throwCCE();
      tmp$_2 = this.field.get_za3lpa$(0).size;
      for (var col = 0; col < tmp$_2; col++) {
        var b = this.buttons.get_za3lpa$(row).get_za3lpa$(col);
        this.updateButton_vux9f0$(col, row);
        b.onclick = ButtonField$setUpField$lambda(col, row, this);
        b.ondblclick = ButtonField$setUpField$lambda_0(col, row, this);
        curRow.appendChild(b);
      }
      main.appendChild(curRow);
    }
    ensureNotNull(document.body).appendChild(main);
  };
  ButtonField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ButtonField',
    interfaces: []
  };
  function EditField(field) {
    ButtonField.call(this, field);
    this.field_z97g76$_0 = field;
  }
  Object.defineProperty(EditField.prototype, 'field', {
    get: function () {
      return this.field_z97g76$_0;
    }
  });
  EditField.prototype.clicked_vux9f0$ = function (x, y) {
    this.field.get_za3lpa$(y).get_za3lpa$(x).mine = !this.field.get_za3lpa$(y).get_za3lpa$(x).mine;
    this.updateButtons();
  };
  EditField.prototype.updateButton_vux9f0$ = function (x, y) {
    var spot = this.field.get_za3lpa$(y).get_za3lpa$(x);
    var button = this.buttons.get_za3lpa$(y).get_za3lpa$(x);
    var mines = getMines(this.field, x, y);
    button.textContent = mines.toString();
    if (spot.mine)
      button.id = 'mine';
    else if (mines === 0)
      button.id = 'zero';
    else
      button.id = 'empty';
  };
  EditField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EditField',
    interfaces: [ButtonField]
  };
  function main$lambda(closure$buttons) {
    return function (it) {
      closure$buttons.setUpField();
      return Unit;
    };
  }
  function main(args) {
    var mainField = deserialize(serialize(fromASCII('[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[X] [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ ] [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [ [ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [ [ [ [ [X[X[ [X[X[ [ [ [ [ \n' + '[ [ [ [ [ [ [X[ [ [ [X[ [ [ [ [ \n' + '[ [ [X[X[X[X[X[ [ [ [X[X[ [ [ [ ')));
    var buttons = new ButtonField(new Minefield(15, 15));
    window.onload = main$lambda(buttons);
  }
  function SpotState(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function SpotState_initFields() {
    SpotState_initFields = function () {
    };
    SpotState$Hidden_instance = new SpotState('Hidden', 0);
    SpotState$Shown_instance = new SpotState('Shown', 1);
    SpotState$Flagged_instance = new SpotState('Flagged', 2);
  }
  var SpotState$Hidden_instance;
  function SpotState$Hidden_getInstance() {
    SpotState_initFields();
    return SpotState$Hidden_instance;
  }
  var SpotState$Shown_instance;
  function SpotState$Shown_getInstance() {
    SpotState_initFields();
    return SpotState$Shown_instance;
  }
  var SpotState$Flagged_instance;
  function SpotState$Flagged_getInstance() {
    SpotState_initFields();
    return SpotState$Flagged_instance;
  }
  SpotState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SpotState',
    interfaces: [Enum]
  };
  function SpotState$values() {
    return [SpotState$Hidden_getInstance(), SpotState$Shown_getInstance(), SpotState$Flagged_getInstance()];
  }
  SpotState.values = SpotState$values;
  function SpotState$valueOf(name) {
    switch (name) {
      case 'Hidden':
        return SpotState$Hidden_getInstance();
      case 'Shown':
        return SpotState$Shown_getInstance();
      case 'Flagged':
        return SpotState$Flagged_getInstance();
      default:throwISE('No enum constant SpotState.' + name);
    }
  }
  SpotState.valueOf_61zpoe$ = SpotState$valueOf;
  function Spot(state, mine) {
    this.state = state;
    this.mine = mine;
  }
  Spot.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Spot',
    interfaces: []
  };
  Spot.prototype.component1 = function () {
    return this.state;
  };
  Spot.prototype.component2 = function () {
    return this.mine;
  };
  Spot.prototype.copy_487ly0$ = function (state, mine) {
    return new Spot(state === void 0 ? this.state : state, mine === void 0 ? this.mine : mine);
  };
  Spot.prototype.toString = function () {
    return 'Spot(state=' + Kotlin.toString(this.state) + (', mine=' + Kotlin.toString(this.mine)) + ')';
  };
  Spot.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.state) | 0;
    result = result * 31 + Kotlin.hashCode(this.mine) | 0;
    return result;
  };
  Spot.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.state, other.state) && Kotlin.equals(this.mine, other.mine)))));
  };
  function Minefield(width, height, mines) {
    if (mines === void 0) {
      var array = Array_0(height);
      var tmp$;
      tmp$ = array.length - 1 | 0;
      for (var i = 0; i <= tmp$; i++) {
        var array_0 = Array_0(width);
        var tmp$_0;
        tmp$_0 = array_0.length - 1 | 0;
        for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
          array_0[i_0] = new Spot(SpotState$Hidden_getInstance(), false);
        }
        array[i] = asList(array_0);
      }
      mines = asList(array);
    }
    this.width = width;
    this.height = height;
    this.mines = mines;
    this.$delegate_qcoihl$_0 = mines;
  }
  Object.defineProperty(Minefield.prototype, 'size', {
    get: function () {
      return this.$delegate_qcoihl$_0.size;
    }
  });
  Minefield.prototype.contains_11rb$ = function (element) {
    return this.$delegate_qcoihl$_0.contains_11rb$(element);
  };
  Minefield.prototype.containsAll_brywnq$ = function (elements) {
    return this.$delegate_qcoihl$_0.containsAll_brywnq$(elements);
  };
  Minefield.prototype.get_za3lpa$ = function (index) {
    return this.$delegate_qcoihl$_0.get_za3lpa$(index);
  };
  Minefield.prototype.indexOf_11rb$ = function (element) {
    return this.$delegate_qcoihl$_0.indexOf_11rb$(element);
  };
  Minefield.prototype.isEmpty = function () {
    return this.$delegate_qcoihl$_0.isEmpty();
  };
  Minefield.prototype.iterator = function () {
    return this.$delegate_qcoihl$_0.iterator();
  };
  Minefield.prototype.lastIndexOf_11rb$ = function (element) {
    return this.$delegate_qcoihl$_0.lastIndexOf_11rb$(element);
  };
  Minefield.prototype.listIterator = function () {
    return this.$delegate_qcoihl$_0.listIterator();
  };
  Minefield.prototype.listIterator_za3lpa$ = function (index) {
    return this.$delegate_qcoihl$_0.listIterator_za3lpa$(index);
  };
  Minefield.prototype.subList_vux9f0$ = function (fromIndex, toIndex) {
    return this.$delegate_qcoihl$_0.subList_vux9f0$(fromIndex, toIndex);
  };
  Minefield.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Minefield',
    interfaces: [List]
  };
  Minefield.prototype.component1 = function () {
    return this.width;
  };
  Minefield.prototype.component2 = function () {
    return this.height;
  };
  Minefield.prototype.component3 = function () {
    return this.mines;
  };
  Minefield.prototype.copy_u5xmri$ = function (width, height, mines) {
    return new Minefield(width === void 0 ? this.width : width, height === void 0 ? this.height : height, mines === void 0 ? this.mines : mines);
  };
  Minefield.prototype.toString = function () {
    return 'Minefield(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', mines=' + Kotlin.toString(this.mines)) + ')';
  };
  Minefield.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.mines) | 0;
    return result;
  };
  Minefield.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.mines, other.mines)))));
  };
  function toIterator$ObjectLiteral(closure$a) {
    this.closure$a = closure$a;
    this.x = 0;
    this.y = 0;
  }
  toIterator$ObjectLiteral.prototype.next = function () {
    var result = this.closure$a.get_za3lpa$(this.y).get_za3lpa$(this.x);
    if (this.x < (this.closure$a.width - 1 | 0)) {
      this.x = this.x + 1 | 0;
    }
     else {
      this.x = 0;
      this.y = this.y + 1 | 0;
    }
    return result;
  };
  toIterator$ObjectLiteral.prototype.hasNext = function () {
    return !(this.y === (this.closure$a.height - 1 | 0) && this.x === (this.closure$a.width - 1 | 0));
  };
  toIterator$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Iterator]
  };
  function toIterator($receiver) {
    var a = $receiver;
    return new toIterator$ObjectLiteral(a);
  }
  function around$ObjectLiteral(closure$x, closure$y, closure$width, closure$height) {
    this.closure$x = closure$x;
    this.closure$y = closure$y;
    this.maxI = (closure$x + 1 | 0) < closure$width ? 1 : 0;
    this.maxJ = (closure$y + 1 | 0) < closure$height ? 1 : 0;
    this.minI = (closure$x - 1 | 0) >= 0 ? -1 : 0;
    this.minJ = (closure$y - 1 | 0) >= 0 ? -1 : 0;
    this.i = this.minI;
    this.j = this.minJ;
  }
  around$ObjectLiteral.prototype.hasNext = function () {
    return this.j <= this.maxJ;
  };
  around$ObjectLiteral.prototype.next = function () {
    var next = new Pair(this.closure$x + this.i | 0, this.closure$y + this.j | 0);
    this.squareNext();
    if (this.i === 0 && this.j === 0)
      this.squareNext();
    return next;
  };
  around$ObjectLiteral.prototype.squareNext = function () {
    this.i = this.i + 1 | 0;
    if (this.i > this.maxI) {
      this.i = this.minI;
      this.j = this.j + 1 | 0;
    }
  };
  around$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Iterator]
  };
  function around($receiver, x, y) {
    var height = $receiver.height;
    var width = $receiver.width;
    var iter = new around$ObjectLiteral(x, y, width, height);
    if (iter.minI === 0 && iter.minJ === 0)
      iter.squareNext();
    return iter;
  }
  function getMines($receiver, x, y) {
    var tmp$;
    var result = 0;
    tmp$ = around($receiver, x, y);
    while (tmp$.hasNext()) {
      var tmp$_0 = tmp$.next();
      var i = tmp$_0.component1()
      , j = tmp$_0.component2();
      if ($receiver.get_za3lpa$(j).get_za3lpa$(i).mine)
        result = result + 1 | 0;
    }
    return result;
  }
  function getFlags($receiver, x, y) {
    var tmp$;
    var result = 0;
    tmp$ = around($receiver, x, y);
    while (tmp$.hasNext()) {
      var tmp$_0 = tmp$.next();
      var i = tmp$_0.component1()
      , j = tmp$_0.component2();
      if ($receiver.get_za3lpa$(j).get_za3lpa$(i).state === SpotState$Flagged_getInstance())
        result = result + 1 | 0;
    }
    return result;
  }
  function unhide($receiver, x, y) {
    var tmp$;
    $receiver.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Shown_getInstance();
    tmp$ = around($receiver, x, y);
    while (tmp$.hasNext()) {
      var tmp$_0 = tmp$.next();
      var i = tmp$_0.component1()
      , j = tmp$_0.component2();
      if (getFlags($receiver, x, y) !== getMines($receiver, x, y))
        break;
      if ($receiver.get_za3lpa$(j).get_za3lpa$(i).state === SpotState$Hidden_getInstance())
        unhide($receiver, i, j);
    }
  }
  function serialize$numerify(spot) {
    var result = 0;
    if (spot.mine)
      result = result + 1 | 0;
    var tmp$;
    tmp$ = result;
    var tmp$_0;
    switch (spot.state.name) {
      case 'Shown':
        tmp$_0 = SpotState$Shown_getInstance().ordinal * 2 | 0;
        break;
      case 'Hidden':
        tmp$_0 = SpotState$Hidden_getInstance().ordinal * 2 | 0;
        break;
      case 'Flagged':
        tmp$_0 = SpotState$Flagged_getInstance().ordinal * 2 | 0;
        break;
      default:tmp$_0 = Kotlin.noWhenBranchMatched();
        break;
    }
    result = tmp$ + tmp$_0 | 0;
    return result;
  }
  function serialize$base36(n) {
    switch (n) {
      case 10:
        return 97;
      case 11:
        return 98;
      case 12:
        return 99;
      case 13:
        return 100;
      case 14:
        return 101;
      case 15:
        return 102;
      case 16:
        return 103;
      case 17:
        return 104;
      case 18:
        return 105;
      case 19:
        return 106;
      case 20:
        return 107;
      case 21:
        return 108;
      case 22:
        return 109;
      case 23:
        return 110;
      case 24:
        return 111;
      case 25:
        return 112;
      case 26:
        return 113;
      case 27:
        return 114;
      case 28:
        return 115;
      case 29:
        return 116;
      case 30:
        return 117;
      case 31:
        return 118;
      case 32:
        return 119;
      case 33:
        return 120;
      case 34:
        return 121;
      case 35:
        return 122;
      default:return n.toString().charCodeAt(0);
    }
  }
  function serialize(f) {
    var numerify = serialize$numerify;
    var base36 = serialize$base36;
    var result = f.width.toString() + ' ';
    var iter = toIterator(f);
    var i = 0;
    while (iter.hasNext()) {
      var s = iter.next();
      var num = numerify(s);
      if (iter.hasNext() && i < f.width)
        num = num + (6 * numerify(iter.next()) | 0) | 0;
      else
        i = 0;
      result += String.fromCharCode(base36(num));
    }
    return result;
  }
  function deserialize$denumerify(n) {
    var tmp$;
    var statenum = n / 2 | 0;
    if (statenum === SpotState$Shown_getInstance().ordinal)
      tmp$ = SpotState$Shown_getInstance();
    else if (statenum === SpotState$Hidden_getInstance().ordinal)
      tmp$ = SpotState$Hidden_getInstance();
    else
      tmp$ = SpotState$Flagged_getInstance();
    return new Spot(tmp$, n % 2 === 1);
  }
  function deserialize$base36(n) {
    switch (n) {
      case 97:
        return 10;
      case 98:
        return 11;
      case 99:
        return 12;
      case 100:
        return 13;
      case 101:
        return 14;
      case 102:
        return 15;
      case 103:
        return 16;
      case 104:
        return 17;
      case 105:
        return 18;
      case 106:
        return 19;
      case 107:
        return 20;
      case 108:
        return 21;
      case 109:
        return 22;
      case 110:
        return 23;
      case 111:
        return 24;
      case 112:
        return 25;
      case 113:
        return 26;
      case 114:
        return 27;
      case 115:
        return 28;
      case 116:
        return 29;
      case 117:
        return 30;
      case 118:
        return 31;
      case 119:
        return 32;
      case 120:
        return 33;
      case 121:
        return 34;
      case 122:
        return 35;
      default:return toInt(String.fromCharCode(n));
    }
  }
  function deserialize(data) {
    var tmp$;
    var denumerify = deserialize$denumerify;
    var base36 = deserialize$base36;
    var asd = split(data, Kotlin.charArrayOf(32));
    var field = asd.get_za3lpa$(1);
    var width = toInt(asd.get_za3lpa$(0));
    var height = (field.length / width | 0) * 2 | 0;
    var result = new Minefield(width, height);
    var i = 0;
    var j = 0;
    tmp$ = iterator(field);
    while (tmp$.hasNext()) {
      var c = unboxChar(tmp$.next());
      var num = base36(c);
      var spot1 = denumerify(num % 6);
      result.get_za3lpa$(j).get_za3lpa$(i).state = spot1.state;
      result.get_za3lpa$(j).get_za3lpa$(i).mine = spot1.mine;
      i = i + 1 | 0;
      if (i > (width - 1 | 0)) {
        i = 0;
        j = j + 1 | 0;
        continue;
      }
      var spot2 = denumerify((num - num % 6 | 0) / 6 | 0);
      result.get_za3lpa$(j).get_za3lpa$(i).state = spot2.state;
      result.get_za3lpa$(j).get_za3lpa$(i).mine = spot2.mine;
      i = i + 1 | 0;
      if (i > (width - 1 | 0)) {
        i = 0;
        j = j + 1 | 0;
      }
    }
    return result;
  }
  function fromASCII(f) {
    var rows = split(f, Kotlin.charArrayOf(10));
    var width = rows.get_za3lpa$(0).length / 2 | 0;
    var height = rows.size;
    var array = Array_0(height);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      var array_0 = Array_0(width);
      var tmp$_0;
      tmp$_0 = array_0.length - 1 | 0;
      for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
        array_0[i_0] = new Spot(SpotState$Hidden_getInstance(), false);
      }
      array[i] = asList(array_0);
    }
    var field = asList(array);
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        if (rows.get_za3lpa$(y).charCodeAt(x * 2 | 0) === 91)
          field.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Hidden_getInstance();
        else if (rows.get_za3lpa$(y).charCodeAt(x * 2 | 0) === 70)
          field.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Flagged_getInstance();
        else
          field.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Shown_getInstance();
        field.get_za3lpa$(y).get_za3lpa$(x).mine = rows.get_za3lpa$(y).charCodeAt((x * 2 | 0) + 1 | 0) === 88;
      }
    }
    return new Minefield(width, height, field);
  }
  function makeRandom($receiver, x, y) {
    var tmp$, tmp$_0;
    tmp$ = toIterator($receiver);
    while (tmp$.hasNext()) {
      var s = tmp$.next();
      s.mine = Math.random() < 0.3;
    }
    tmp$_0 = around($receiver, x, y);
    while (tmp$_0.hasNext()) {
      var tmp$_1 = tmp$_0.next();
      var a = tmp$_1.component1()
      , b = tmp$_1.component2();
      $receiver.get_za3lpa$(b).get_za3lpa$(a).mine = false;
    }
    $receiver.get_za3lpa$(y).get_za3lpa$(x).mine = false;
  }
  function PlayField(field) {
    ButtonField.call(this, field);
    this.field_s3yy6w$_0 = field;
  }
  Object.defineProperty(PlayField.prototype, 'field', {
    get: function () {
      return this.field_s3yy6w$_0;
    }
  });
  PlayField.prototype.clicked_vux9f0$ = function (x, y) {
    if (this.field.get_za3lpa$(y).get_za3lpa$(x).state === SpotState$Hidden_getInstance())
      this.field.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Flagged_getInstance();
    else if (this.field.get_za3lpa$(y).get_za3lpa$(x).state === SpotState$Flagged_getInstance())
      this.field.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Hidden_getInstance();
    else {
      unhide(this.field, x, y);
      this.updateButtons();
    }
    this.updateButton_vux9f0$(x, y);
  };
  PlayField.prototype.doubleClicked_vux9f0$ = function (x, y) {
    unhide(this.field, x, y);
    this.updateButtons();
  };
  PlayField.prototype.updateButton_vux9f0$ = function (x, y) {
    var spot = this.field.get_za3lpa$(y).get_za3lpa$(x);
    var button = this.buttons.get_za3lpa$(y).get_za3lpa$(x);
    button.textContent = getMines(this.field, x, y).toString();
    if (spot.state === SpotState$Shown_getInstance())
      if (spot.mine)
        button.id = 'mine';
      else if (getMines(this.field, x, y) === 0)
        button.id = 'zero';
      else
        button.id = 'empty';
    else if (spot.state === SpotState$Flagged_getInstance())
      button.id = 'flag';
    else
      button.id = 'hidden';
  };
  PlayField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayField',
    interfaces: [ButtonField]
  };
  _.ButtonField = ButtonField;
  _.EditField = EditField;
  _.main_kand9s$ = main;
  Object.defineProperty(SpotState, 'Hidden', {
    get: SpotState$Hidden_getInstance
  });
  Object.defineProperty(SpotState, 'Shown', {
    get: SpotState$Shown_getInstance
  });
  Object.defineProperty(SpotState, 'Flagged', {
    get: SpotState$Flagged_getInstance
  });
  _.SpotState = SpotState;
  _.Spot = Spot;
  _.Minefield = Minefield;
  _.toIterator_zg8qlk$ = toIterator;
  _.around_y99o70$ = around;
  _.getMines_y99o70$ = getMines;
  _.getFlags_y99o70$ = getFlags;
  _.unhide_y99o70$ = unhide;
  _.serialize_qcoihl$ = serialize;
  _.deserialize_61zpoe$ = deserialize;
  _.fromASCII_61zpoe$ = fromASCII;
  _.makeRandom_y99o70$ = makeRandom;
  _.PlayField = PlayField;
  main([]);
  Kotlin.defineModule('MineSweeper', _);
  return _;
}(typeof MineSweeper === 'undefined' ? {} : MineSweeper, kotlin);
