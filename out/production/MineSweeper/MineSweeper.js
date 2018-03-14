if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'MineSweeper'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'MineSweeper'.");
}
var MineSweeper = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var asList = Kotlin.kotlin.collections.asList_us0mfu$;
  var List = Kotlin.kotlin.collections.List;
  var Iterator = Kotlin.kotlin.collections.Iterator;
  var Pair = Kotlin.kotlin.Pair;
  var split = Kotlin.kotlin.text.split_o64adg$;
  SpotState.prototype = Object.create(Enum.prototype);
  SpotState.prototype.constructor = SpotState;
  var f;
  var Array_0 = Array;
  var buttons;
  function main$lambda(it) {
    setUpField(f);
    return Unit;
  }
  function main(args) {
    window.onload = main$lambda;
  }
  function clicked(x, y) {
    if (f.get_za3lpa$(y).get_za3lpa$(x).state === SpotState$Hidden_getInstance())
      f.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Flagged_getInstance();
    else if (f.get_za3lpa$(y).get_za3lpa$(x).state === SpotState$Flagged_getInstance())
      f.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Hidden_getInstance();
    else {
      unhide(f, x, y);
      updateButtons();
    }
    updateButton(x, y);
  }
  function doubleClicked(x, y) {
    unhide(f, x, y);
    updateButtons();
  }
  function updateButtons() {
    var tmp$, tmp$_0;
    tmp$ = f.height;
    for (var y = 0; y < tmp$; y++) {
      tmp$_0 = f.width;
      for (var x = 0; x < tmp$_0; x++) {
        updateButton(x, y);
      }
    }
  }
  function updateButton(x, y) {
    var spot = f.get_za3lpa$(y).get_za3lpa$(x);
    var button = buttons[y][x];
    if (spot.state === SpotState$Shown_getInstance())
      if (spot.mine)
        button.id = 'mine';
      else if (getMines(f, x, y) === 0)
        buttons[y][x].id = 'zero';
      else
        button.id = 'empty';
    else if (spot.state === SpotState$Flagged_getInstance())
      button.id = 'flag';
    else
      button.id = 'hidden';
  }
  function setUpField$lambda(closure$col, closure$row) {
    return function (it) {
      clicked(closure$col, closure$row);
      return Unit;
    };
  }
  function setUpField$lambda_0(closure$col, closure$row) {
    return function (it) {
      doubleClicked(closure$col, closure$row);
      return Unit;
    };
  }
  function setUpField(field) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var main = Kotlin.isType(tmp$ = document.createElement('div'), HTMLDivElement) ? tmp$ : throwCCE();
    tmp$_0 = field.size;
    for (var row = 0; row < tmp$_0; row++) {
      var curRow = Kotlin.isType(tmp$_1 = document.createElement('div'), HTMLDivElement) ? tmp$_1 : throwCCE();
      tmp$_2 = field.get_za3lpa$(0).size;
      for (var col = 0; col < tmp$_2; col++) {
        var b = buttons[row][col];
        b.textContent = getMines(f, col, row).toString();
        updateButton(col, row);
        b.onclick = setUpField$lambda(col, row);
        b.ondblclick = setUpField$lambda_0(col, row);
        curRow.appendChild(b);
      }
      main.appendChild(curRow);
    }
    ensureNotNull(document.body).appendChild(main);
    println(serialize(f));
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
    if (this.x < (this.closure$a.width - 1 | 0))
      this.x = this.x + 1 | 0;
    else {
      this.x = 0;
      this.y = this.y + 1 | 0;
    }
    return this.closure$a.get_za3lpa$(this.y).get_za3lpa$(this.x);
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
  function around$ObjectLiteral(closure$x, closure$a, closure$y) {
    this.closure$x = closure$x;
    this.closure$a = closure$a;
    this.closure$y = closure$y;
    this.lowI = (closure$x - 1 | 0) > 0 ? -1 : 0;
    this.i = this.lowI;
    this.j = (closure$y - 1 | 0) > 0 ? -1 : 0;
  }
  around$ObjectLiteral.prototype.hasNext = function () {
    println(this.i.toString() + ',' + this.j + ',' + (!(this.i === 1 && this.j === 1) || !((this.closure$x + this.i | 0) < (this.closure$a.width - 1 | 0) && (this.closure$y + this.j | 0) < (this.closure$a.height - 1 | 0))));
    return !(this.i >= 1 && this.j >= 1);
  };
  around$ObjectLiteral.prototype.next = function () {
    if (this.i < 1)
      this.i = this.i + 1 | 0;
    else {
      this.i = this.lowI;
      this.j = this.j + 1 | 0;
    }
    if (this.i === 0 && this.j === 0)
      this.i = 1;
    return new Pair(this.i + this.closure$x | 0, this.j + this.closure$y | 0);
  };
  around$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Iterator]
  };
  function around($receiver, x, y) {
    var a = $receiver;
    println(x.toString() + ',' + y);
    return new around$ObjectLiteral(x, a, y);
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
    var result = 0;
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0)
          continue;
        if ((y + i | 0) < 0 || (y + i | 0) >= $receiver.size)
          continue;
        if ((x + j | 0) < 0 || (x + j | 0) >= $receiver.get_za3lpa$(0).size)
          continue;
        if ($receiver.get_za3lpa$(y + i | 0).get_za3lpa$(x + j | 0).state === SpotState$Flagged_getInstance())
          result = result + 1 | 0;
      }
    }
    return result;
  }
  function unhide($receiver, x, y) {
    $receiver.get_za3lpa$(y).get_za3lpa$(x).state = SpotState$Shown_getInstance();
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0)
          continue;
        if ((y + i | 0) < 0 || (y + i | 0) >= $receiver.size)
          continue;
        if ((x + j | 0) < 0 || (x + j | 0) >= $receiver.get_za3lpa$(0).size)
          continue;
        if (getFlags($receiver, x, y) !== getMines($receiver, x, y))
          continue;
        if ($receiver.get_za3lpa$(y + i | 0).get_za3lpa$(x + j | 0).state === SpotState$Hidden_getInstance())
          unhide($receiver, x + j | 0, y + i | 0);
      }
    }
  }
  function serialize$numerify(spot) {
    var result = 0;
    if (spot.mine)
      result = result + 1 | 0;
    if (spot.state === SpotState$Hidden_getInstance())
      result = result + 2 | 0;
    else if (spot.state === SpotState$Flagged_getInstance())
      result = result + 4 | 0;
    return result;
  }
  function serialize$base36(n) {
    if (n < 10)
      return n.toString().charCodeAt(0);
    else if (n === 10)
      return 97;
    else if (n === 11)
      return 98;
    else if (n === 12)
      return 99;
    else if (n === 13)
      return 100;
    else if (n === 14)
      return 101;
    else if (n === 15)
      return 102;
    else if (n === 16)
      return 103;
    else if (n === 17)
      return 104;
    else if (n === 18)
      return 105;
    else if (n === 19)
      return 106;
    else if (n === 20)
      return 107;
    else if (n === 21)
      return 108;
    else if (n === 22)
      return 109;
    else if (n === 23)
      return 110;
    else if (n === 24)
      return 111;
    else if (n === 25)
      return 112;
    else if (n === 26)
      return 113;
    else if (n === 27)
      return 114;
    else if (n === 28)
      return 115;
    else if (n === 29)
      return 116;
    else if (n === 30)
      return 117;
    else if (n === 31)
      return 118;
    else if (n === 32)
      return 119;
    else if (n === 33)
      return 120;
    else if (n === 34)
      return 121;
    else
      return 122;
  }
  function serialize(f) {
    var numerify = serialize$numerify;
    var base36 = serialize$base36;
    var result = f.width.toString() + ' ';
    var iter = toIterator(f);
    while (iter.hasNext()) {
      var s = iter.next();
      var asd = numerify(s);
      if (iter.hasNext())
        asd = asd + (6 * numerify(iter.next()) | 0) | 0;
      result += String.fromCharCode(base36(asd));
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
  Object.defineProperty(_, 'f', {
    get: function () {
      return f;
    }
  });
  Object.defineProperty(_, 'buttons', {
    get: function () {
      return buttons;
    }
  });
  _.main_kand9s$ = main;
  _.clicked_vux9f0$ = clicked;
  _.doubleClicked_vux9f0$ = doubleClicked;
  _.updateButtons = updateButtons;
  _.updateButton_vux9f0$ = updateButton;
  _.setUpField_qcoihl$ = setUpField;
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
  _.fromASCII_61zpoe$ = fromASCII;
  f = fromASCII('[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[X] [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[X[X[X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ ] [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [X[ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [ [ [ [ [ [ [ [ [ [ [ [ [ [ \n' + '[ [ [ [ [ [ [X[X[ [X[X[ [ [ [ [ \n' + '[ [ [ [ [ [ [X[ [ [ [X[ [ [ [ [ \n' + '[ [ [X[X[X[X[X[ [ [ [X[X[ [ [ [ ');
  var array = Array_0(f.size);
  var tmp$;
  tmp$ = array.length - 1 | 0;
  for (var i = 0; i <= tmp$; i++) {
    var array_0 = Array_0(f.get_za3lpa$(0).size);
    var tmp$_0;
    tmp$_0 = array_0.length - 1 | 0;
    for (var i_0 = 0; i_0 <= tmp$_0; i_0++) {
      var tmp$_1;
      array_0[i_0] = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    }
    array[i] = array_0;
  }
  buttons = array;
  main([]);
  Kotlin.defineModule('MineSweeper', _);
  return _;
}(typeof MineSweeper === 'undefined' ? {} : MineSweeper, kotlin);
