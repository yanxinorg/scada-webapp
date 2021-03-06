//v.3.5 build 120822

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
 */
function dhtmlXToolbarObject(b, c) {
	var a = this;
	for (this.cont = typeof b != "object" ? document.getElementById(b) : b; this.cont.childNodes.length > 0; )
		this.cont.removeChild(this.cont.childNodes[0]);
	this.cont.dir = "ltr";
	this.cont.innerHTML += "<div class='dhxtoolbar_hdrline_ll'></div><div class='dhxtoolbar_hdrline_rr'></div><div class='dhxtoolbar_hdrline_l'></div><div class='dhxtoolbar_hdrline_r'></div>";
	this.base = document.createElement("DIV");
	this.base.className = "float_left";
	this.cont.appendChild(this.base);
	this.align =
		"left";
	this.setAlign = function (a) {
		this.align = a == "right" ? "right" : "left";
		this.base.className = a == "right" ? "float_right" : "float_left";
		if (this._spacer)
			this._spacer.className = "dhxtoolbar_spacer " + (a == "right" ? " float_left" : " float_right")
	};
	this._isIE6 = !1;
	if (_isIE)
		this._isIE6 = window.XMLHttpRequest == null ? !0 : !1;
	if (this._isIPad = navigator.userAgent.search(/iPad/gi) >= 0)
		this.cont.ontouchstart = function (a) {
			a = a || event;
			a.returnValue = !1;
			a.cancelBubble = !0;
			return !1
		};
	this.iconSize = 18;
	this.setIconSize = function (a) {
		this.iconSize = {
			18 : !0,
			24 : !0,
			32 : !0,
			48 : !0
		}
		[a] ? a : 18;
		this.setSkin(this.skin, !0);
		this.callEvent("_onIconSizeChange", [this.iconSize])
	};
	this.selectPolygonOffsetLeft = this.selectPolygonOffsetTop = 0;
	this._improveTerraceSkin = function (a) {
		var b = null;
		a != null && (b = {}, b[a] = a);
		var g = {
			buttonInput : !0,
			separator : !0,
			text : !0
		},
		f;
		for (f in b || this.objPull)
			if (this.objPull[f] != null && this.objPull[f].obj != null) {
				if (this.objPull[f].type == "buttonInput")
					this.objPull[f].obj.className = this.objPull[f].obj.className.replace(/dhx_toolbar_btn/, "dhx_toolbar_inp");
				var i = this.objPull[f][this.objPull[f].type == "buttonSelect" ? "arw" : "obj"],
				c = !1,
				j = !1;
				if (!g[this.objPull[f].type]) {
					i == i.parentNode.lastChild && (c = !0);
					if (i.nextSibling != null) {
						var h = null,
						l;
						for (l in this.objPull)
							if (this.objPull[l].obj == i.nextSibling)
								h = this.objPull[l].type;
						g[h] && (c = !0)
					}
					this.objPull[f].obj == i.parentNode.firstChild && (j = !0);
					if (this.objPull[f].obj.previousSibling != null) {
						h = null;
						for (l in this.objPull)
							if (this.objPull[l].obj == this.objPull[f].obj.previousSibling)
								h = this.objPull[l].type;
						g[h] && (j = !0)
					}
				}
				i.style.borderRight =
					c ? "1px solid #cecece" : "";
				i.style.borderTopRightRadius = i.style.borderBottomRightRadius = c ? "5px" : "0px";
				this.objPull[f].obj.style.borderTopLeftRadius = this.objPull[f].obj.style.borderBottomLeftRadius = j ? "5px" : "0px";
				this.objPull[f].obj._br = c;
				this.objPull[f].obj._bl = j;
				i = null
			}
	};
	this._improveTerraceButtonSelect = function (a, b) {
		var c = this.objPull[a];
		b == !0 ? (c.obj.style.borderBottomLeftRadius = c.obj._bl ? "5px" : "0px", c.arw.style.borderBottomRightRadius = c.obj._br ? "5px" : "0px") : (c.obj.style.borderBottomLeftRadius = "0px",
			c.arw.style.borderBottomRightRadius = "0px");
		c = null
	};
	this.setSkin = function (a, b) {
		if (b === !0)
			this.cont.className = this.cont.className.replace(/dhx_toolbar_base_\d{1,}_/, "dhx_toolbar_base_" + this.iconSize + "_");
		else {
			this.skin = a;
			if (this.skin == "dhx_skyblue")
				this.selectPolygonOffsetTop = 1;
			if (this.skin == "dhx_web")
				this.selectPolygonOffsetLeft = this.selectPolygonOffsetTop = 1;
			if (this.skin == "dhx_terrace")
				this.selectPolygonOffsetTop = -1, this.selectPolygonOffsetLeft = 0;
			this.cont.className = "dhx_toolbar_base_" + this.iconSize +
				"_" + this.skin + (this.rtl ? " rtl" : "")
		}
		for (var c in this.objPull) {
			var f = this.objPull[c];
			if (f.type == "slider")
				f.pen._detectLimits(), f.pen._definePos(), f.label.className = "dhx_toolbar_slider_label_" + this.skin + (this.rtl ? " rtl" : "");
			if (f.type == "buttonSelect")
				f.polygon.className = "dhx_toolbar_poly_" + this.iconSize + "_" + this.skin + (this.rtl ? " rtl" : "")
		}
		a == "dhx_terrace" && this._improveTerraceSkin()
	};
	this.setSkin(c != null ? c : typeof dhtmlx != "undefined" && typeof dhtmlx.skin == "string" ? dhtmlx.skin : "dhx_skyblue");
	this.objPull = {};
	this.anyUsed = "none";
	this.imagePath = "";
	this.setIconPath = this.setIconsPath = function (a) {
		this.imagePath = a
	};
	this._doOnLoad = function () {};
	this.loadXML = function (a, b) {
		if (b != null)
			this._doOnLoad = function () {
				b()
			};
		this.callEvent("onXLS", []);
		this._xmlLoader = new dtmlXMLLoaderObject(this._xmlParser, window);
		this._xmlLoader.loadXML(a)
	};
	this.loadXMLString = function (a, b) {
		if (b != null)
			this._doOnLoad = function () {
				b()
			};
		this._xmlLoader = new dtmlXMLLoaderObject(this._xmlParser, window);
		this._xmlLoader.loadXMLString(a)
	};
	this._xmlParser =
	function () {
		for (var d = this.getXMLTopNode("toolbar"), b = "id,type,hidden,title,text,enabled,img,imgdis,action,openAll,renderSelect,mode,maxOpen,width,value,selected,length,textMin,textMax,toolTip,valueMin,valueMax,valueNow".split(","), c = "id,type,enabled,disabled,action,selected,img,text".split(","), f = 0; f < d.childNodes.length; f++)
			if (d.childNodes[f].tagName == "item") {
				for (var i = {}, k = 0; k < b.length; k++)
					i[b[k]] = d.childNodes[f].getAttribute(b[k]);
				i.items = [];
				i.userdata = [];
				for (var j = 0; j < d.childNodes[f].childNodes.length; j++) {
					if (d.childNodes[f].childNodes[j].tagName ==
						"item" && i.type == "buttonSelect") {
						for (var h = {}, k = 0; k < c.length; k++)
							h[c[k]] = d.childNodes[f].childNodes[j].getAttribute(c[k]);
						try {
							h.itemText = d.childNodes[f].childNodes[j].getElementsByTagName("itemText")[0].firstChild.nodeValue
						} catch (l) {}

						for (var n = d.childNodes[f].childNodes[j].getElementsByTagName("userdata"), k = 0; k < n.length; k++) {
							if (!h.userdata)
								h.userdata = {};
							var m = {};
							try {
								m.name = n[k].getAttribute("name")
							} catch (o) {
								m.name = ""
							}
							try {
								m.value = n[k].firstChild.nodeValue
							} catch (p) {
								m.value = ""
							}
							if (m.name != "")
								h.userdata[m.name] =
									m.value
						}
						i.items[i.items.length] = h
					}
					if (d.childNodes[f].childNodes[j].tagName == "userdata") {
						h = {};
						try {
							h.name = d.childNodes[f].childNodes[j].getAttribute("name")
						} catch (q) {
							h.name = ""
						}
						try {
							h.value = d.childNodes[f].childNodes[j].firstChild.nodeValue
						} catch (r) {
							h.value = ""
						}
						i.userdata[i.userdata.length] = h
					}
				}
				a._addItemToStorage(i)
			}
		a.skin == "dhx_terrace" && a._improveTerraceSkin();
		a.callEvent("onXLE", []);
		a._doOnLoad();
		this.destructor()
	};
	this._addItemToStorage = function (a, b) {
		var c = a.id || this._genStr(24),
		f = a.type || "";
		if (f !=
			"" && this["_" + f + "Object"] != null) {
			if ((typeof a.openAll == "undefined" || a.openAll == null) && this.skin == "dhx_terrace")
				a.openAll = !0;
			this.objPull[this.idPrefix + c] = new this["_" + f + "Object"](this, c, a);
			this.objPull[this.idPrefix + c].type = f;
			this.setPosition(c, b)
		}
		if (a.userdata)
			for (var i = 0; i < a.userdata.length; i++)
				this.setUserData(c, a.userdata[i].name, a.userdata[i].value)
	};
	this._genStr = function (a) {
		for (var b = "", c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", f = 0; f < a; f++)
			b += c.charAt(Math.round(Math.random() *
					(c.length - 1)));
		return b
	};
	this.rootTypes = "button,buttonSelect,buttonTwoState,separator,label,slider,text,buttonInput".split(",");
	this.idPrefix = this._genStr(12);
	dhtmlxEventable(this);
	this._getObj = function (a, b) {
		for (var c = null, f = 0; f < a.childNodes.length; f++)
			a.childNodes[f].tagName != null && String(a.childNodes[f].tagName).toLowerCase() == String(b).toLowerCase() && (c = a.childNodes[f]);
		return c
	};
	this._addImgObj = function (a) {
		var b = document.createElement("IMG");
		a.childNodes.length > 0 ? a.insertBefore(b, a.childNodes[0]) :
		a.appendChild(b);
		return b
	};
	this._setItemImage = function (a, b, c) {
		c == !0 ? a.imgEn = b : a.imgDis = b;
		if (!(!a.state && c == !0 || a.state && c == !1)) {
			var f = this._getObj(a.obj, "img");
			f == null && (f = this._addImgObj(a.obj));
			f.src = this.imagePath + b
		}
	};
	this._clearItemImage = function (a, b) {
		b == !0 ? a.imgEn = "" : a.imgDis = "";
		if (!(!a.state && b == !0 || a.state && b == !1)) {
			var c = this._getObj(a.obj, "img");
			c != null && c.parentNode.removeChild(c)
		}
	};
	this._setItemText = function (a, b) {
		var c = this._getObj(a.obj, "div");
		b == null || b.length == 0 ? c != null && c.parentNode.removeChild(c) :
		(c == null && (c = document.createElement("DIV"), a.obj.appendChild(c)), c.innerHTML = b)
	};
	this._getItemText = function (a) {
		var b = this._getObj(a.obj, "div");
		return b != null ? b.innerHTML : ""
	};
	this._enableItem = function (a) {
		if (!a.state) {
			a.state = !0;
			this.objPull[a.id].type == "buttonTwoState" && this.objPull[a.id].obj.pressed == !0 ? (a.obj.className = "dhx_toolbar_btn pres", a.obj.renderAs = "dhx_toolbar_btn over") : (a.obj.className = "dhx_toolbar_btn def", a.obj.renderAs = a.obj.className);
			if (a.arw)
				a.arw.className = String(a.obj.className).replace("btn",
						"arw");
			var b = this._getObj(a.obj, "img");
			a.imgEn != "" ? (b == null && (b = this._addImgObj(a.obj)), b.src = this.imagePath + a.imgEn) : b != null && b.parentNode.removeChild(b)
		}
	};
	this._disableItem = function (a) {
		if (a.state) {
			a.state = !1;
			a.obj.className = "dhx_toolbar_btn " + (this.objPull[a.id].type == "buttonTwoState" && a.obj.pressed ? "pres_" : "") + "dis";
			a.obj.renderAs = "dhx_toolbar_btn def";
			if (a.arw)
				a.arw.className = String(a.obj.className).replace("btn", "arw");
			var b = this._getObj(a.obj, "img");
			a.imgDis != "" ? (b == null && (b = this._addImgObj(a.obj)),
				b.src = this.imagePath + a.imgDis) : b != null && b.parentNode.removeChild(b);
			if (a.polygon != null && a.polygon.style.display != "none") {
				a.polygon.style.display = "none";
				if (a.polygon._ie6cover)
					a.polygon._ie6cover.style.display = "none";
				this.skin == "dhx_terrace" && this._improveTerraceButtonSelect(a.id, !0)
			}
			this.anyUsed = "none"
		}
	};
	this.clearAll = function () {
		for (var a in this.objPull)
			this._removeItem(String(a).replace(this.idPrefix, ""))
	};
	this._isWebToolbar = !0;
	this._doOnClick = function () {
		a.forEachItem(function (b) {
			if (a.objPull[a.idPrefix +
					b].type == "buttonSelect") {
				var c = a.objPull[a.idPrefix + b];
				if (c.polygon.style.display != "none") {
					c.obj.renderAs = "dhx_toolbar_btn def";
					c.obj.className = c.obj.renderAs;
					c.arw.className = String(c.obj.renderAs).replace("btn", "arw");
					a.anyUsed = "none";
					c.polygon.style.display = "none";
					if (c.polygon._ie6cover)
						c.polygon._ie6cover.style.display = "none";
					a.skin == "dhx_terrace" && a._improveTerraceButtonSelect(c.id, !0)
				}
			}
		})
	};
	this._isIPad ? document.addEventListener("touchstart", this._doOnClick, !1) : _isIE ? document.body.attachEvent("onclick",
		this._doOnClick) : window.addEventListener("click", this._doOnClick, !1);
	return this
}
dhtmlXToolbarObject.prototype.addSpacer = function (b) {
	var c = this.idPrefix + b;
	if (this._spacer != null) {
		if (this._spacer.idd == b)
			return;
		if (this._spacer == this.objPull[c].obj.parentNode) {
			for (var a = !0; a; ) {
				var d = this._spacer.childNodes[0].idd;
				this.base.appendChild(this._spacer.childNodes[0]);
				if (d == b || this._spacer.childNodes.length == 0)
					this.objPull[c].arw != null && this.base.appendChild(this.objPull[c].arw), a = !1
			}
			this._spacer.idd = b;
			this._fixSpacer();
			return
		}
		if (this.base == this.objPull[c].obj.parentNode) {
			for (var a = !0,
				e = this.objPull[c].arw != null; a; ) {
				var g = this.base.childNodes.length - 1;
				e == !0 && this.base.childNodes[g] == this.objPull[c].arw && (a = !1);
				this.base.childNodes[g].idd == b && (a = !1);
				a && (this._spacer.childNodes.length > 0 ? this._spacer.insertBefore(this.base.childNodes[g], this._spacer.childNodes[0]) : this._spacer.appendChild(this.base.childNodes[g]))
			}
			this._spacer.idd = b;
			this._fixSpacer();
			return
		}
	} else {
		for (var f = null, g = 0; g < this.base.childNodes.length; g++)
			this.base.childNodes[g] == this.objPull[this.idPrefix + b].obj && (f = g,
				this.objPull[this.idPrefix + b].arw != null && (f = g + 1));
		if (f != null) {
			this._spacer = document.createElement("DIV");
			this._spacer.className = "dhxtoolbar_spacer " + (this.align == "right" ? " float_left" : " float_right");
			this._spacer.dir = "rtl";
			for (this._spacer.idd = b; this.base.childNodes.length > f + 1; )
				this._spacer.appendChild(this.base.childNodes[f + 1]);
			this.cont.appendChild(this._spacer);
			this._fixSpacer()
		}
	}
	this.skin == "dhx_terrace" && this._improveTerraceSkin()
};
dhtmlXToolbarObject.prototype.removeSpacer = function () {
	if (this._spacer) {
		for (; this._spacer.childNodes.length > 0; )
			this.base.appendChild(this._spacer.childNodes[0]);
		this._spacer.parentNode.removeChild(this._spacer);
		this._spacer = null;
		this.skin == "dhx_terrace" && this._improveTerraceSkin()
	}
};
dhtmlXToolbarObject.prototype._fixSpacer = function () {
	if (_isIE && this._spacer != null) {
		this._spacer.style.borderLeft = "1px solid #a4bed4";
		var b = this._spacer;
		window.setTimeout(function () {
			b.style.borderLeft = "0px solid #a4bed4";
			b = null
		}, 1)
	}
};
dhtmlXToolbarObject.prototype.getType = function (b) {
	var c = this.getParentId(b);
	if (c != null) {
		var a = null,
		d = this.objPull[this.idPrefix + c]._listOptions[b];
		d != null && (a = d.sep != null ? "buttonSelectSeparator" : "buttonSelectButton");
		return a
	} else
		return this.objPull[this.idPrefix + b] == null ? null : this.objPull[this.idPrefix + b].type
};
dhtmlXToolbarObject.prototype.getTypeExt = function (b) {
	var c = this.getType(b);
	return c == "buttonSelectButton" || c == "buttonSelectSeparator" ? c = c == "buttonSelectButton" ? "button" : "separator" : null
};
dhtmlXToolbarObject.prototype.inArray = function (b, c) {
	for (var a = 0; a < b.length; a++)
		if (b[a] == c)
			return !0;
	return !1
};
dhtmlXToolbarObject.prototype.getParentId = function (b) {
	var c = null,
	a;
	for (a in this.objPull)
		if (this.objPull[a]._listOptions)
			for (var d in this.objPull[a]._listOptions)
				d == b && (c = String(a).replace(this.idPrefix, ""));
	return c
};
dhtmlXToolbarObject.prototype._addItem = function (b, c) {
	this._addItemToStorage(b, c);
	this.skin == "dhx_terrace" && this._improveTerraceSkin()
};
dhtmlXToolbarObject.prototype.addButton = function (b, c, a, d, e) {
	this._addItem({
		id : b,
		type : "button",
		text : a,
		img : d,
		imgdis : e
	}, c)
};
dhtmlXToolbarObject.prototype.addText = function (b, c, a) {
	this._addItem({
		id : b,
		type : "text",
		text : a
	}, c)
};
dhtmlXToolbarObject.prototype.addButtonSelect = function (b, c, a, d, e, g, f, i, k) {
	for (var j = [], h = 0; h < d.length; h++) {
		var l = {};
		d[h].id && d[h].type ? (l.id = d[h].id, l.type = d[h].type == "obj" ? "button" : "separator", l.text = d[h].text, l.img = d[h].img) : (l.id = d[h][0], l.type = d[h][1] == "obj" ? "button" : "separator", l.text = d[h][2] || null, l.img = d[h][3] || null);
		j[j.length] = l
	}
	this._addItem({
		id : b,
		type : "buttonSelect",
		text : a,
		img : e,
		imgdis : g,
		renderSelect : f,
		openAll : i,
		items : j,
		maxOpen : k
	}, c)
};
dhtmlXToolbarObject.prototype.addButtonTwoState = function (b, c, a, d, e) {
	this._addItem({
		id : b,
		type : "buttonTwoState",
		img : d,
		imgdis : e,
		text : a
	}, c)
};
dhtmlXToolbarObject.prototype.addSeparator = function (b, c) {
	this._addItem({
		id : b,
		type : "separator"
	}, c)
};
dhtmlXToolbarObject.prototype.addSlider = function (b, c, a, d, e, g, f, i, k) {
	this._addItem({
		id : b,
		type : "slider",
		length : a,
		valueMin : d,
		valueMax : e,
		valueNow : g,
		textMin : f,
		textMax : i,
		toolTip : k
	}, c)
};
dhtmlXToolbarObject.prototype.addInput = function (b, c, a, d) {
	this._addItem({
		id : b,
		type : "buttonInput",
		value : a,
		width : d
	}, c)
};
dhtmlXToolbarObject.prototype.forEachItem = function (b) {
	for (var c in this.objPull)
		this.inArray(this.rootTypes, this.objPull[c].type) && b(this.objPull[c].id.replace(this.idPrefix, ""))
};
(function () {
	for (var b = "showItem,hideItem,isVisible,enableItem,disableItem,isEnabled,setItemText,getItemText,setItemToolTip,getItemToolTip,getInput,setItemImage,setItemImageDis,clearItemImage,clearItemImageDis,setItemState,getItemState,setItemToolTipTemplate,getItemToolTipTemplate,setValue,getValue,setMinValue,getMinValue,setMaxValue,getMaxValue,setWidth,getWidth,setMaxOpen".split(","), c = ["", "", !1, "", "", !1, "", "", "", "", "", "", "", "", "", !1, "", "", "", null, "", [null, null], "", [null, null], "", null], a = function (a,
			b) {
		return function (d, c, e) {
			d = this.idPrefix + d;
			return this.objPull[d][a] != null ? this.objPull[d][a].call(this.objPull[d], c, e) : b
		}
	}, d = 0; d < b.length; d++) {
		var e = b[d],
		g = c[d];
		dhtmlXToolbarObject.prototype[e] = a(e, g)
	}
})();
dhtmlXToolbarObject.prototype.getPosition = function (b) {
	return this._getPosition(b)
};
dhtmlXToolbarObject.prototype._getPosition = function (b) {
	if (this.objPull[this.idPrefix + b] == null)
		return null;
	for (var c = null, a = 0, d = 0; d < this.base.childNodes.length; d++)
		this.base.childNodes[d].idd != null && (this.base.childNodes[d].idd == b && (c = a), a++);
	if (!c && this._spacer != null)
		for (d = 0; d < this._spacer.childNodes.length; d++)
			this._spacer.childNodes[d].idd != null && (this._spacer.childNodes[d].idd == b && (c = a), a++);
	return c
};
dhtmlXToolbarObject.prototype.setPosition = function (b, c) {
	this._setPosition(b, c)
};
dhtmlXToolbarObject.prototype._setPosition = function (b, c) {
	if (this.objPull[this.idPrefix + b] != null) {
		if (isNaN(c))
			c = this.base.childNodes.length;
		c < 0 && (c = 0);
		var a = null;
		if (this._spacer)
			a = this._spacer.idd, this.removeSpacer();
		var d = this.objPull[this.idPrefix + b];
		this.base.removeChild(d.obj);
		d.arw && this.base.removeChild(d.arw);
		var e = this._getIdByPosition(c, !0);
		e[0] == null ? (this.base.appendChild(d.obj), d.arw && this.base.appendChild(d.arw)) : (this.base.insertBefore(d.obj, this.base.childNodes[e[1]]), d.arw && this.base.insertBefore(d.arw,
				this.base.childNodes[e[1] + 1]));
		a != null && this.addSpacer(a)
	}
};
dhtmlXToolbarObject.prototype._getIdByPosition = function (b, c) {
	for (var a = null, d = 0, e = 0, g = 0; g < this.base.childNodes.length; g++)
		this.base.childNodes[g].idd != null && a == null && d++ == b && (a = this.base.childNodes[g].idd), a == null && e++;
	e = a == null ? null : e;
	return c == !0 ? [a, e] : a
};
dhtmlXToolbarObject.prototype.removeItem = function (b) {
	this._removeItem(b);
	this.skin == "dhx_terrace" && this._improveTerraceSkin()
};
dhtmlXToolbarObject.prototype._removeItem = function (b) {
	var c = this.getType(b),
	b = this.idPrefix + b,
	a = this.objPull[b];
	if (c == "button")
		a.obj._doOnMouseOver = null, a.obj._doOnMouseOut = null, a.obj._doOnMouseUp = null, a.obj._doOnMouseUpOnceAnywhere = null, a.obj.onclick = null, a.obj.onmouseover = null, a.obj.onmouseout = null, a.obj.onmouseup = null, a.obj.onmousedown = null, a.obj.onselectstart = null, a.obj.renderAs = null, a.obj.idd = null, a.obj.parentNode.removeChild(a.obj), a.obj = null, a.id = null, a.state = null, a.img = null, a.imgEn = null, a.imgDis =
			null, a.type = null, a.enableItem = null, a.disableItem = null, a.isEnabled = null, a.showItem = null, a.hideItem = null, a.isVisible = null, a.setItemText = null, a.getItemText = null, a.setItemImage = null, a.clearItemImage = null, a.setItemImageDis = null, a.clearItemImageDis = null, a.setItemToolTip = null, a.getItemToolTip = null;
	if (c == "buttonTwoState")
		a.obj._doOnMouseOver = null, a.obj._doOnMouseOut = null, a.obj.onmouseover = null, a.obj.onmouseout = null, a.obj.onmousedown = null, a.obj.onselectstart = null, a.obj.renderAs = null, a.obj.idd = null, a.obj.parentNode.removeChild(a.obj),
		a.obj = null, a.id = null, a.state = null, a.img = null, a.imgEn = null, a.imgDis = null, a.type = null, a.enableItem = null, a.disableItem = null, a.isEnabled = null, a.showItem = null, a.hideItem = null, a.isVisible = null, a.setItemText = null, a.getItemText = null, a.setItemImage = null, a.clearItemImage = null, a.setItemImageDis = null, a.clearItemImageDis = null, a.setItemToolTip = null, a.getItemToolTip = null, a.setItemState = null, a.getItemState = null;
	if (c == "buttonSelect") {
		for (var d in a._listOptions)
			this.removeListOption(b, d);
		a._listOptions = null;
		if (a.polygon._ie6cover)
			document.body.removeChild(a.polygon._ie6cover),
			a.polygon._ie6cover = null;
		a.p_tbl.removeChild(a.p_tbody);
		a.polygon.removeChild(a.p_tbl);
		a.polygon.onselectstart = null;
		document.body.removeChild(a.polygon);
		a.p_tbody = null;
		a.p_tbl = null;
		a.polygon = null;
		a.obj.onclick = null;
		a.obj.onmouseover = null;
		a.obj.onmouseout = null;
		a.obj.onmouseup = null;
		a.obj.onmousedown = null;
		a.obj.onselectstart = null;
		a.obj.idd = null;
		a.obj.iddPrefix = null;
		a.obj.parentNode.removeChild(a.obj);
		a.obj = null;
		a.arw.onclick = null;
		a.arw.onmouseover = null;
		a.arw.onmouseout = null;
		a.arw.onmouseup = null;
		a.arw.onmousedown =
			null;
		a.arw.onselectstart = null;
		a.arw.parentNode.removeChild(a.arw);
		a.arw = null;
		a.renderSelect = null;
		a.state = null;
		a.type = null;
		a.id = null;
		a.img = null;
		a.imgEn = null;
		a.imgDis = null;
		a.openAll = null;
		a._isListButton = null;
		a._separatorButtonSelectObject = null;
		a._buttonButtonSelectObject = null;
		a.setWidth = null;
		a.enableItem = null;
		a.disableItem = null;
		a.isEnabled = null;
		a.showItem = null;
		a.hideItem = null;
		a.isVisible = null;
		a.setItemText = null;
		a.getItemText = null;
		a.setItemImage = null;
		a.clearItemImage = null;
		a.setItemImageDis = null;
		a.clearItemImageDis =
			null;
		a.setItemToolTip = null;
		a.getItemToolTip = null;
		a.addListOption = null;
		a.removeListOption = null;
		a.showListOption = null;
		a.hideListOption = null;
		a.isListOptionVisible = null;
		a.enableListOption = null;
		a.disableListOption = null;
		a.isListOptionEnabled = null;
		a.setListOptionPosition = null;
		a.getListOptionPosition = null;
		a.setListOptionImage = null;
		a.getListOptionImage = null;
		a.clearListOptionImage = null;
		a.setListOptionText = null;
		a.getListOptionText = null;
		a.setListOptionToolTip = null;
		a.getListOptionToolTip = null;
		a.forEachListOption =
			null;
		a.getAllListOptions = null;
		a.setListOptionSelected = null;
		a.getListOptionSelected = null
	}
	if (c == "buttonInput")
		a.obj.childNodes[0].onkeydown = null, a.obj.removeChild(a.obj.childNodes[0]), a.obj.w = null, a.obj.idd = null, a.obj.parentNode.removeChild(a.obj), a.obj = null, a.id = null, a.type = null, a.enableItem = null, a.disableItem = null, a.isEnabled = null, a.showItem = null, a.hideItem = null, a.isVisible = null, a.setItemToolTip = null, a.getItemToolTip = null, a.setWidth = null, a.getWidth = null, a.setValue = null, a.getValue = null, a.setItemText =
			null, a.getItemText = null;
	if (c == "slider") {
		this._isIPad ? (document.removeEventListener("touchmove", pen._doOnMouseMoveStart, !1), document.removeEventListener("touchend", pen._doOnMouseMoveEnd, !1)) : _isIE ? (document.body.detachEvent("onmousemove", a.pen._doOnMouseMoveStart), document.body.detachEvent("onmouseup", a.pen._doOnMouseMoveEnd)) : (window.removeEventListener("mousemove", a.pen._doOnMouseMoveStart, !1), window.removeEventListener("mouseup", a.pen._doOnMouseMoveEnd, !1));
		a.pen.allowMove = null;
		a.pen.initXY = null;
		a.pen.maxX = null;
		a.pen.minX = null;
		a.pen.nowX = null;
		a.pen.newNowX = null;
		a.pen.valueMax = null;
		a.pen.valueMin = null;
		a.pen.valueNow = null;
		a.pen._definePos = null;
		a.pen._detectLimits = null;
		a.pen._doOnMouseMoveStart = null;
		a.pen._doOnMouseMoveEnd = null;
		a.pen.onmousedown = null;
		a.obj.removeChild(a.pen);
		a.pen = null;
		a.label.tip = null;
		document.body.removeChild(a.label);
		a.label = null;
		a.obj.onselectstart = null;
		for (a.obj.idd = null; a.obj.childNodes.length > 0; )
			a.obj.removeChild(a.obj.childNodes[0]);
		a.obj.parentNode.removeChild(a.obj);
		a.obj = null;
		a.id = null;
		a.type = null;
		a.state = null;
		a.enableItem = null;
		a.disableItem = null;
		a.isEnabled = null;
		a.setItemToolTipTemplate = null;
		a.getItemToolTipTemplate = null;
		a.setMaxValue = null;
		a.setMinValue = null;
		a.getMaxValue = null;
		a.getMinValue = null;
		a.setValue = null;
		a.getValue = null;
		a.showItem = null;
		a.hideItem = null;
		a.isVisible = null
	}
	if (c == "separator")
		a.obj.onselectstart = null, a.obj.idd = null, a.obj.parentNode.removeChild(a.obj), a.obj = null, a.id = null, a.type = null, a.showItem = null, a.hideItem = null, a.isVisible = null;
	if (c == "text")
		a.obj.onselectstart =
			null, a.obj.idd = null, a.obj.parentNode.removeChild(a.obj), a.obj = null, a.id = null, a.type = null, a.showItem = null, a.hideItem = null, a.isVisible = null, a.setWidth = null, a.setItemText = null, a.getItemText = null;
	a = c = null;
	this.objPull[this.idPrefix + b] = null;
	delete this.objPull[this.idPrefix + b]
};
(function () {
	for (var b = "addListOption,removeListOption,showListOption,hideListOption,isListOptionVisible,enableListOption,disableListOption,isListOptionEnabled,setListOptionPosition,getListOptionPosition,setListOptionText,getListOptionText,setListOptionToolTip,getListOptionToolTip,setListOptionImage,getListOptionImage,clearListOptionImage,forEachListOption,getAllListOptions,setListOptionSelected,getListOptionSelected".split(","), c = function (a) {
		return function (b, f, d, c, j, h) {
			b = this.idPrefix + b;
			if (this.objPull[b] !=
				null)
				return this.objPull[b].type != "buttonSelect" ? void 0 : this.objPull[b][a].call(this.objPull[b], f, d, c, j, h)
			}
		}, a = 0; a < b.length; a++) {
			var d = b[a];
			dhtmlXToolbarObject.prototype[d] = c(d)
		}
})();
dhtmlXToolbarObject.prototype._rtlParseBtn = function (b, c) {
	return b + c
};
dhtmlXToolbarObject.prototype._separatorObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.obj = document.createElement("DIV");
	this.obj.className = "dhx_toolbar_sep";
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.idd = String(c);
	this.obj.title = a.title || "";
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	if (b._isIPad)
		this.obj.ontouchstart = function (a) {
			a = a || event;
			a.returnValue = !1;
			a.cancelBubble = !0;
			return !1
		};
	b.base.appendChild(this.obj);
	this.showItem = function () {
		this.obj.style.display =
			""
	};
	this.hideItem = function () {
		this.obj.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display == ""
	};
	return this
};
dhtmlXToolbarObject.prototype._textObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.obj = document.createElement("DIV");
	this.obj.className = "dhx_toolbar_text";
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.idd = String(c);
	this.obj.title = a.title || "";
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	if (b._isIPad)
		this.obj.ontouchstart = function (a) {
			a = a || event;
			a.returnValue = !1;
			a.cancelBubble = !0;
			return !1
		};
	this.obj.innerHTML = a.text || "";
	b.base.appendChild(this.obj);
	this.showItem = function () {
		this.obj.style.display =
			""
	};
	this.hideItem = function () {
		this.obj.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display == ""
	};
	this.setItemText = function (a) {
		this.obj.innerHTML = a
	};
	this.getItemText = function () {
		return this.obj.innerHTML
	};
	this.setWidth = function (a) {
		this.obj.style.width = a + "px"
	};
	this.setItemToolTip = function (a) {
		this.obj.title = a
	};
	this.getItemToolTip = function () {
		return this.obj.title
	};
	return this
};
dhtmlXToolbarObject.prototype._buttonObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.state = a.enabled != null ? !1 : !0;
	this.imgEn = a.img || "";
	this.imgDis = a.imgdis || "";
	this.img = this.state ? this.imgEn != "" ? this.imgEn : "" : this.imgDis != "" ? this.imgDis : "";
	this.obj = document.createElement("DIV");
	this.obj.className = "dhx_toolbar_btn " + (this.state ? "def" : "dis");
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.allowClick = !1;
	this.obj.extAction = a.action || null;
	this.obj.renderAs = this.obj.className;
	this.obj.idd = String(c);
	this.obj.title = a.title || "";
	this.obj.pressed = !1;
	this.obj.innerHTML = b._rtlParseBtn(this.img != "" ? "<img src='" + b.imagePath + this.img + "'>" : "", a.text != null ? "<div>" + a.text + "</div>" : "");
	var d = this;
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	this.obj.onmouseover = function () {
		this._doOnMouseOver()
	};
	this.obj.onmouseout = function () {
		this._doOnMouseOut()
	};
	this.obj._doOnMouseOver = function () {
		this.allowClick = !0;
		if (d.state != !1 && b.anyUsed == "none")
			this.renderAs = this.className = "dhx_toolbar_btn over"
	};
	this.obj._doOnMouseOut = function () {
		this.allowClick = !1;
		if (d.state != !1 && b.anyUsed == "none")
			this.className = "dhx_toolbar_btn def", this.renderAs = this.renderAs
	};
	this.obj.onclick = function (a) {
		if (d.state != !1 && this.allowClick != !1) {
			var a = a || event,
			c = this.idd.replace(b.idPrefix, "");
			if (this.extAction)
				try {
					window[this.extAction](c)
				} catch (f) {}

			b && b.callEvent && b.callEvent("onClick", [c])
		}
	};
	this.obj[b._isIPad ? "ontouchstart" : "onmousedown"] = function (a) {
		if (d.state == !1)
			return a = a || event, a.returnValue = !1, a.cancelBubble = !0, !1;
		if (b.anyUsed == "none")
			return b.anyUsed = this.idd, this.className = "dhx_toolbar_btn pres", this.pressed = !0, this.onmouseover = function () {
				this._doOnMouseOver()
			},
		this.onmouseout = function () {
			b.anyUsed = "none";
			this._doOnMouseOut()
		},
		!1
	};
	this.obj[b._isIPad ? "ontouchend" : "onmouseup"] = function () {
		if (d.state != !1 && !(b.anyUsed != "none" && b.anyUsed != this.idd)) {
			var a = b.anyUsed;
			this._doOnMouseUp();
			b._isIPad && a != "none" && b.callEvent("onClick", [this.idd.replace(b.idPrefix, "")])
		}
	};
	if (b._isIPad)
		this.obj.ontouchmove = function () {
			this._doOnMouseUp()
		};
	this.obj._doOnMouseUp = function () {
		b.anyUsed = "none";
		this.className = this.renderAs;
		this.pressed = !1
	};
	this.obj._doOnMouseUpOnceAnywhere = function () {
		this._doOnMouseUp();
		this.onmouseover = function () {
			this._doOnMouseOver()
		};
		this.onmouseout = function () {
			this._doOnMouseOut()
		}
	};
	b.base.appendChild(this.obj);
	this.enableItem = function () {
		b._enableItem(this)
	};
	this.disableItem = function () {
		b._disableItem(this)
	};
	this.isEnabled = function () {
		return this.state
	};
	this.showItem = function () {
		this.obj.style.display = ""
	};
	this.hideItem = function () {
		this.obj.style.display =
			"none"
	};
	this.isVisible = function () {
		return this.obj.style.display == ""
	};
	this.setItemText = function (a) {
		b._setItemText(this, a)
	};
	this.getItemText = function () {
		return b._getItemText(this)
	};
	this.setItemImage = function (a) {
		b._setItemImage(this, a, !0)
	};
	this.clearItemImage = function () {
		b._clearItemImage(this, !0)
	};
	this.setItemImageDis = function (a) {
		b._setItemImage(this, a, !1)
	};
	this.clearItemImageDis = function () {
		b._clearItemImage(this, !1)
	};
	this.setItemToolTip = function (a) {
		this.obj.title = a
	};
	this.getItemToolTip = function () {
		return this.obj.title
	};
	return this
};
dhtmlXToolbarObject.prototype._buttonSelectObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.state = a.enabled != null ? a.enabled == "true" ? !0 : !1 : !0;
	this.imgEn = a.img || "";
	this.imgDis = a.imgdis || "";
	this.img = this.state ? this.imgEn != "" ? this.imgEn : "" : this.imgDis != "" ? this.imgDis : "";
	this.mode = a.mode || "button";
	if (this.mode == "select") {
		if (this.openAll = !0, this.renderSelect = !1, !a.text || a.text.length == 0)
			a.text = "&nbsp;"
	} else
		this.openAll = a.openAll == "true" || a.openAll == !0 || a.openAll == 1 || a.openAll == "1" || a.openAll == "yes" || a.openAll ==
			"on", this.renderSelect = a.renderSelect != null ? a.renderSelect == "false" || a.renderSelect == "disabled" ? !1 : !0 : !0;
	this.maxOpen = !isNaN(a.maxOpen ? a.maxOpen : "") ? a.maxOpen : null;
	this._maxOpenTest = function () {
		if (!isNaN(this.maxOpen) && !b._sbw) {
			var a = document.createElement("DIV");
			a.className = "dhxtoolbar_maxopen_test";
			document.body.appendChild(a);
			var d = document.createElement("DIV");
			d.className = "dhxtoolbar_maxopen_test2";
			a.appendChild(d);
			b._sbw = a.offsetWidth - d.offsetWidth;
			a.removeChild(d);
			d = null;
			document.body.removeChild(a);
			a = null
		}
	};
	this._maxOpenTest();
	this.obj = document.createElement("DIV");
	this.obj.allowClick = !1;
	this.obj.extAction = a.action || null;
	this.obj.className = "dhx_toolbar_btn " + (this.state ? "def" : "dis");
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.renderAs = this.obj.className;
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	this.obj.idd = String(c);
	this.obj.title = a.title || "";
	this.callEvent = this.obj.pressed = !1;
	this.obj.innerHTML = b._rtlParseBtn(this.img != "" ? "<img src='" + b.imagePath + this.img +
			"'>" : "", a.text != null ? "<div>" + a.text + "</div>" : "");
	b.base.appendChild(this.obj);
	this.arw = document.createElement("DIV");
	this.arw.className = "dhx_toolbar_arw " + (this.state ? "def" : "dis");
	this.arw.style.display = this.obj.style.display;
	this.arw.innerHTML = "<div class='arwimg'>&nbsp;</div>";
	this.arw.title = this.obj.title;
	this.arw.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	b.base.appendChild(this.arw);
	var d = this;
	this.obj.onmouseover = function (a) {
		a = a || event;
		if (b.anyUsed == "none" && d.state)
			d.obj.renderAs =
				"dhx_toolbar_btn over", d.obj.className = d.obj.renderAs, d.arw.className = String(d.obj.renderAs).replace("btn", "arw")
	};
	this.obj.onmouseout = function () {
		d.obj.allowClick = !1;
		if (b.anyUsed == "none" && d.state)
			d.obj.renderAs = "dhx_toolbar_btn def", d.obj.className = d.obj.renderAs, d.arw.className = String(d.obj.renderAs).replace("btn", "arw"), d.callEvent = !1
	};
	this.arw.onmouseover = this.obj.onmouseover;
	this.arw.onmouseout = this.obj.onmouseout;
	if (this.openAll != !0)
		this.obj.onclick = function (a) {
			a = a || event;
			if (d.obj.allowClick &&
				d.state && b.anyUsed == "none") {
				var c = d.obj.idd.replace(b.idPrefix, "");
				if (d.obj.extAction)
					try {
						window[d.obj.extAction](c)
					} catch (e) {}

				b.callEvent("onClick", [c])
			}
		},
	this.obj[b._isIPad ? "ontouchstart" : "onmousedown"] = function (a) {
		a = a || event;
		if (b.anyUsed == "none" && d.state)
			d.obj.allowClick = !0, d.obj.className = "dhx_toolbar_btn pres", d.arw.className = "dhx_toolbar_arw pres", d.callEvent = !0
	},
	this.obj[b._isIPad ? "ontouchend" : "onmouseup"] = function (a) {
		a = a || event;
		a.cancelBubble = !0;
		if (b.anyUsed == "none" && d.state && (d.obj.className =
					d.obj.renderAs, d.arw.className = String(d.obj.renderAs).replace("btn", "arw"), b._isIPad && d.callEvent)) {
			var c = d.obj.idd.replace(b.idPrefix, "");
			b.callEvent("onClick", [c])
		}
	};
	if (b._isIPad)
		this.obj.ontouchmove = this.obj.onmouseout;
	this.arw[b._isIPad ? "ontouchstart" : "onmousedown"] = function (a) {
		a = a || event;
		if (d.state) {
			if (b.anyUsed == d.obj.idd) {
				d.obj.className = d.obj.renderAs;
				d.arw.className = String(d.obj.renderAs).replace("btn", "arw");
				b.anyUsed = "none";
				d.polygon.style.display = "none";
				if (d.polygon._ie6cover)
					d.polygon._ie6cover.style.display =
						"none";
				b.skin == "dhx_terrace" && b._improveTerraceButtonSelect(d.id, !0)
			} else {
				if (b.anyUsed != "none" && b.objPull[b.idPrefix + b.anyUsed].type == "buttonSelect") {
					var c = b.objPull[b.idPrefix + b.anyUsed];
					if (c.polygon.style.display != "none") {
						c.obj.renderAs = "dhx_toolbar_btn def";
						c.obj.className = c.obj.renderAs;
						c.arw.className = String(d.obj.renderAs).replace("btn", "arw");
						c.polygon.style.display = "none";
						if (c.polygon._ie6cover)
							c.polygon._ie6cover.style.display = "none";
						b.skin == "dhx_terrace" && b._improveTerraceButtonSelect(c.id,
							!0)
					}
				}
				d.obj.className = "dhx_toolbar_btn over";
				d.arw.className = "dhx_toolbar_arw pres";
				b.anyUsed = d.obj.idd;
				d.polygon.style.top = "0px";
				d.polygon.style.visibility = "hidden";
				d.polygon.style.display = "";
				b.skin == "dhx_terrace" && b._improveTerraceButtonSelect(d.id, !1);
				d._fixMaxOpenHeight(d.maxOpen || null);
				b._autoDetectVisibleArea();
				var e = getAbsoluteTop(d.obj) + d.obj.offsetHeight + b.selectPolygonOffsetTop,
				g = d.polygon.offsetHeight;
				if (e + g > b.tY2) {
					var h = d.maxOpen != null ? Math.floor((b.tY2 - e) / 22) : 0;
					h >= 1 ? d._fixMaxOpenHeight(h) :
					(e = getAbsoluteTop(d.obj) - g - b.selectPolygonOffsetTop, e < 0 && (e = 0))
				}
				d.polygon.style.top = e + "px";
				d.polygon.style.left = b.rtl ? getAbsoluteLeft(d.obj) + d.obj.offsetWidth - d.polygon.offsetWidth + b.selectPolygonOffsetLeft + "px" : getAbsoluteLeft(d.obj) + b.selectPolygonOffsetLeft + "px";
				d.polygon.style.visibility = "visible";
				if (d.polygon._ie6cover)
					d.polygon._ie6cover.style.left = d.polygon.style.left, d.polygon._ie6cover.style.top = d.polygon.style.top, d.polygon._ie6cover.style.width = d.polygon.offsetWidth + "px", d.polygon._ie6cover.style.height =
						d.polygon.offsetHeight + "px", d.polygon._ie6cover.style.display = ""
			}
			return !1
		}
	};
	this.arw.onclick = function (a) {
		a = a || event;
		a.cancelBubble = !0
	};
	this.arw[b._isIPad ? "ontouchend" : "onmouseup"] = function (a) {
		a = a || event;
		a.cancelBubble = !0
	};
	if (this.openAll === !0 && (this.obj.onclick = this.arw.onclick, this.obj.onmousedown = this.arw.onmousedown, this.obj.onmouseup = this.arw.onmouseup, b._isIPad))
		this.obj.ontouchstart = this.arw.ontouchstart, this.obj.ontouchend = this.arw.ontouchend;
	this.obj.iddPrefix = b.idPrefix;
	this._listOptions = {};
	this._fixMaxOpenHeight = function (a) {
		var c = "auto",
		e = !1;
		if (a !== null) {
			var g = 0,
			h;
			for (h in this._listOptions)
				g++;
			g > a ? (this._ph = 22 * a, c = this._ph + "px") : e = !0
		}
		this.polygon.style.width = "auto";
		this.polygon.style.height = "auto";
		if (!e && d.maxOpen != null)
			this.polygon.style.width = this.p_tbl.offsetWidth + b._sbw + "px", this.polygon.style.height = c
	};
	this._separatorButtonSelectObject = function (a, b, c) {
		this.obj = {};
		this.obj.tr = document.createElement("TR");
		this.obj.tr.className = "tr_sep";
		this.obj.tr.onselectstart = function (a) {
			a =
				a || event;
			return a.returnValue = !1
		};
		this.obj.td = document.createElement("TD");
		this.obj.td.colSpan = "2";
		this.obj.td.className = "td_btn_sep";
		this.obj.td.onselectstart = function (a) {
			a = a || event;
			return a.returnValue = !1
		};
		isNaN(c) ? c = d.p_tbody.childNodes.length + 1 : c < 1 && (c = 1);
		c > d.p_tbody.childNodes.length ? d.p_tbody.appendChild(this.obj.tr) : d.p_tbody.insertBefore(this.obj.tr, d.p_tbody.childNodes[c - 1]);
		this.obj.tr.appendChild(this.obj.td);
		this.obj.sep = document.createElement("DIV");
		this.obj.sep.className = "btn_sep";
		this.obj.sep.onselectstart =
		function (a) {
			a = a || event;
			return a.returnValue = !1
		};
		this.obj.td.appendChild(this.obj.sep);
		d._listOptions[a] = this.obj;
		return this
	};
	this._buttonButtonSelectObject = function (a, c, e) {
		this.obj = {};
		this.obj.tr = document.createElement("TR");
		this.obj.tr.en = c.enabled == "false" ? !1 : c.disabled == "true" ? !1 : !0;
		this.obj.tr.extAction = c.action || null;
		this.obj.tr._selected = c.selected != null;
		this.obj.tr.className = "tr_btn" + (this.obj.tr.en ? this.obj.tr._selected && d.renderSelect ? " tr_btn_selected" : "" : " tr_btn_disabled");
		this.obj.tr.onselectstart =
		function (a) {
			a = a || event;
			return a.returnValue = !1
		};
		this.obj.tr.idd = String(a);
		if (c.userdata)
			this.obj.userData = c.userdata;
		isNaN(e) ? e = d.p_tbody.childNodes.length + 1 : e < 1 && (e = 1);
		e > d.p_tbody.childNodes.length ? d.p_tbody.appendChild(this.obj.tr) : d.p_tbody.insertBefore(this.obj.tr, d.p_tbody.childNodes[e - 1]);
		this.obj.td_a = document.createElement("TD");
		this.obj.td_a.className = "td_btn_img";
		this.obj.td_a.onselectstart = function (a) {
			a = a || event;
			return a.returnValue = !1
		};
		this.obj.td_b = document.createElement("TD");
		this.obj.td_b.className =
			"td_btn_txt";
		this.obj.td_b.onselectstart = function (a) {
			a = a || event;
			return a.returnValue = !1
		};
		b.rtl ? (this.obj.tr.appendChild(this.obj.td_b), this.obj.tr.appendChild(this.obj.td_a)) : (this.obj.tr.appendChild(this.obj.td_a), this.obj.tr.appendChild(this.obj.td_b));
		if (c.img != null)
			this.obj.td_a.innerHTML = "<img class='btn_sel_img' src='" + b.imagePath + c.img + "' border='0'>", this.obj.tr._img = c.img;
		var g = c.text != null ? c.text : c.itemText || "";
		this.obj.td_b.innerHTML = "<div class='btn_sel_text'>" + g + "</div>";
		this.obj.tr[b._isIPad ?
			"ontouchstart" : "onmouseover"] = function () {
			if (this.en && (!this._selected || !d.renderSelect))
				this.className = "tr_btn tr_btn_over"
		};
		this.obj.tr.onmouseout = function () {
			if (this.en)
				if (this._selected && d.renderSelect) {
					if (String(this.className).search("tr_btn_selected") == -1)
						this.className = "tr_btn tr_btn_selected"
				} else
					this.className = "tr_btn"
		};
		this.obj.tr[b._isIPad ? "ontouchend" : "onclick"] = function (a) {
			a = a || event;
			a.cancelBubble = !0;
			if (this.en) {
				d.setListOptionSelected(this.idd.replace(b.idPrefix, ""));
				d.obj.renderAs =
					"dhx_toolbar_btn def";
				d.obj.className = d.obj.renderAs;
				d.arw.className = String(d.obj.renderAs).replace("btn", "arw");
				d.polygon.style.display = "none";
				if (d.polygon._ie6cover)
					d.polygon._ie6cover.style.display = "none";
				b.skin == "dhx_terrace" && b._improveTerraceButtonSelect(d.id, !0);
				b.anyUsed = "none";
				var c = this.idd.replace(b.idPrefix, "");
				if (this.extAction)
					try {
						window[this.extAction](c)
					} catch (f) {}

				b.callEvent("onClick", [c])
			}
		};
		d._listOptions[a] = this.obj;
		return this
	};
	this.polygon = document.createElement("DIV");
	this.polygon.dir =
		"ltr";
	this.polygon.style.display = "none";
	this.polygon.style.zIndex = 101;
	this.polygon.className = "dhx_toolbar_poly_" + b.iconSize + "_" + b.skin + (b.rtl ? " rtl" : "");
	this.polygon.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	this.polygon.style.overflowY = "auto";
	if (b._isIPad)
		this.polygon.ontouchstart = function (a) {
			a = a || event;
			a.returnValue = !1;
			a.cancelBubble = !0;
			return !1
		};
	this.p_tbl = document.createElement("TABLE");
	this.p_tbl.className = "buttons_cont";
	this.p_tbl.cellSpacing = "0";
	this.p_tbl.cellPadding = "0";
	this.p_tbl.border =
		"0";
	this.polygon.appendChild(this.p_tbl);
	this.p_tbody = document.createElement("TBODY");
	this.p_tbl.appendChild(this.p_tbody);
	if (a.items)
		for (var e = 0; e < a.items.length; e++) {
			var g = "_" + (a.items[e].type || "") + "ButtonSelectObject";
			typeof this[g] == "function" && new this[g](a.items[e].id || b._genStr(24), a.items[e])
		}
	document.body.appendChild(this.polygon);
	if (b._isIE6)
		this.polygon._ie6cover = document.createElement("IFRAME"), this.polygon._ie6cover.frameBorder = 0, this.polygon._ie6cover.style.position = "absolute", this.polygon._ie6cover.style.border =
			"none", this.polygon._ie6cover.style.backgroundColor = "#000000", this.polygon._ie6cover.style.filter = "alpha(opacity=100)", this.polygon._ie6cover.style.display = "none", this.polygon._ie6cover.setAttribute("src", "javascript:false;"), document.body.appendChild(this.polygon._ie6cover);
	this.setWidth = function (a) {
		this.obj.style.width = a - this.arw.offsetWidth + "px";
		this.polygon.style.width = this.obj.offsetWidth + this.arw.offsetWidth - 2 + "px";
		this.p_tbl.style.width = this.polygon.style.width
	};
	this.enableItem = function () {
		b._enableItem(this)
	};
	this.disableItem = function () {
		b._disableItem(this)
	};
	this.isEnabled = function () {
		return this.state
	};
	this.showItem = function () {
		this.obj.style.display = "";
		this.arw.style.display = ""
	};
	this.hideItem = function () {
		this.obj.style.display = "none";
		this.arw.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display == ""
	};
	this.setItemText = function (a) {
		b._setItemText(this, a)
	};
	this.getItemText = function () {
		return b._getItemText(this)
	};
	this.setItemImage = function (a) {
		b._setItemImage(this, a, !0)
	};
	this.clearItemImage =
	function () {
		b._clearItemImage(this, !0)
	};
	this.setItemImageDis = function (a) {
		b._setItemImage(this, a, !1)
	};
	this.clearItemImageDis = function () {
		b._clearItemImage(this, !1)
	};
	this.setItemToolTip = function (a) {
		this.obj.title = a;
		this.arw.title = a
	};
	this.getItemToolTip = function () {
		return this.obj.title
	};
	this.addListOption = function (a, b, c, d, e) {
		if (c == "button" || c == "separator") {
			var g = {
				id : a,
				type : c,
				text : d,
				img : e
			};
			new this["_" + c + "ButtonSelectObject"](a, g, b)
		}
	};
	this.removeListOption = function (a) {
		if (this._isListButton(a, !0)) {
			var b =
				this._listOptions[a];
			if (b.td_a != null && b.td_b != null) {
				b.td_a.onselectstart = null;
				for (b.td_b.onselectstart = null; b.td_a.childNodes.length > 0; )
					b.td_a.removeChild(b.td_a.childNodes[0]);
				for (; b.td_b.childNodes.length > 0; )
					b.td_b.removeChild(b.td_b.childNodes[0]);
				b.tr.onselectstart = null;
				b.tr.onmouseover = null;
				b.tr.onmouseout = null;
				for (b.tr.onclick = null; b.tr.childNodes.length > 0; )
					b.tr.removeChild(b.tr.childNodes[0]);
				b.tr.parentNode.removeChild(b.tr);
				b.td_a = null;
				b.td_b = null
			} else {
				b.sep.onselectstart = null;
				b.td.onselectstart =
					null;
				for (b.tr.onselectstart = null; b.td.childNodes.length > 0; )
					b.td.removeChild(b.td.childNodes[0]);
				for (; b.tr.childNodes.length > 0; )
					b.tr.removeChild(b.tr.childNodes[0]);
				b.tr.parentNode.removeChild(b.tr);
				b.sep = null;
				b.td = null
			}
			b = b.tr = null;
			this._listOptions[a] = null;
			try {
				delete this._listOptions[a]
			} catch (c) {}

		}
	};
	this.showListOption = function (a) {
		if (this._isListButton(a, !0))
			this._listOptions[a].tr.style.display = ""
	};
	this.hideListOption = function (a) {
		if (this._isListButton(a, !0))
			this._listOptions[a].tr.style.display =
				"none"
	};
	this.isListOptionVisible = function (a) {
		return !this._isListButton(a, !0) ? void 0 : this._listOptions[a].tr.style.display != "none"
	};
	this.enableListOption = function (a) {
		if (this._isListButton(a))
			this._listOptions[a].tr.en = !0, this._listOptions[a].tr.className = "tr_btn" + (this._listOptions[a].tr._selected && b.renderSelect ? " tr_btn_selected" : "")
	};
	this.disableListOption = function (a) {
		if (this._isListButton(a))
			this._listOptions[a].tr.en = !1, this._listOptions[a].tr.className = "tr_btn tr_btn_disabled"
	};
	this.isListOptionEnabled =
	function (a) {
		return !this._isListButton(a) ? void 0 : this._listOptions[a].tr.en
	};
	this.setListOptionPosition = function (a, b) {
		if (this._listOptions[a] && !(this.getListOptionPosition(a) == b || isNaN(b))) {
			b < 1 && (b = 1);
			var c = this._listOptions[a].tr;
			this.p_tbody.removeChild(c);
			b > this.p_tbody.childNodes.length ? this.p_tbody.appendChild(c) : this.p_tbody.insertBefore(c, this.p_tbody.childNodes[b - 1]);
			c = null
		}
	};
	this.getListOptionPosition = function (a) {
		var b = -1;
		if (!this._listOptions[a])
			return b;
		for (var c = 0; c < this.p_tbody.childNodes.length; c++)
			this.p_tbody.childNodes[c] ==
			this._listOptions[a].tr && (b = c + 1);
		return b
	};
	this.setListOptionImage = function (a, c) {
		if (this._isListButton(a)) {
			var d = this._listOptions[a].tr.childNodes[b.rtl ? 1 : 0];
			if (d.childNodes.length > 0)
				d.childNodes[0].src = b.imagePath + c;
			else {
				var e = document.createElement("IMG");
				e.className = "btn_sel_img";
				e.src = b.imagePath + c;
				d.appendChild(e)
			}
			d = null
		}
	};
	this.getListOptionImage = function (a) {
		if (this._isListButton(a)) {
			var c = this._listOptions[a].tr.childNodes[b.rtl ? 1 : 0],
			d = null;
			if (c.childNodes.length > 0)
				d = c.childNodes[0].src;
			c =
				null;
			return d
		}
	};
	this.clearListOptionImage = function (a) {
		if (this._isListButton(a)) {
			for (var c = this._listOptions[a].tr.childNodes[b.rtl ? 1 : 0]; c.childNodes.length > 0; )
				c.removeChild(c.childNodes[0]);
			c = null
		}
	};
	this.setListOptionText = function (a, c) {
		if (this._isListButton(a))
			this._listOptions[a].tr.childNodes[b.rtl ? 0 : 1].childNodes[0].innerHTML = c
	};
	this.getListOptionText = function (a) {
		return !this._isListButton(a) ? void 0 : this._listOptions[a].tr.childNodes[b.rtl ? 0 : 1].childNodes[0].innerHTML
	};
	this.setListOptionToolTip =
	function (a, b) {
		if (this._isListButton(a))
			this._listOptions[a].tr.title = b
	};
	this.getListOptionToolTip = function (a) {
		return !this._isListButton(a) ? void 0 : this._listOptions[a].tr.title
	};
	this.forEachListOption = function (a) {
		for (var b in this._listOptions)
			a(b)
	};
	this.getAllListOptions = function () {
		var a = [],
		b;
		for (b in this._listOptions)
			a[a.length] = b;
		return a
	};
	this.setListOptionSelected = function (a) {
		for (var b in this._listOptions) {
			var c = this._listOptions[b];
			if (c.td_a != null && c.td_b != null && c.tr.en)
				b == a ? (c.tr._selected =
						!0, c.tr.className = "tr_btn" + (this.renderSelect ? " tr_btn_selected" : ""), this.mode == "select" && (c.tr._img ? this.setItemImage(c.tr._img) : this.clearItemImage(), this.setItemText(this.getListOptionText(a)))) : (c.tr._selected = !1, c.tr.className = "tr_btn");
			c = null
		}
	};
	this.getListOptionSelected = function () {
		var a = null,
		b;
		for (b in this._listOptions)
			this._listOptions[b].tr._selected == !0 && (a = b);
		return a
	};
	this._isListButton = function (a, b) {
		return this._listOptions[a] == null ? !1 : !b && this._listOptions[a].tr.className == "tr_sep" ?
		!1 : !0
	};
	this.setMaxOpen = function (a) {
		this._ph = null;
		typeof a == "number" ? (this.maxOpen = a, this._maxOpenTest()) : this.maxOpen = null
	};
	a.width && this.setWidth(a.width);
	this.mode == "select" && typeof a.selected != "undefined" && this.setListOptionSelected(a.selected);
	return this
};
dhtmlXToolbarObject.prototype._buttonInputObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.obj = document.createElement("DIV");
	this.obj.id = "test";
	this.obj.className = "dhx_toolbar_btn def";
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.idd = String(c);
	this.obj.w = a.width != null ? a.width : 100;
	this.obj.title = a.title != null ? a.title : "";
	this.obj.innerHTML = "<input class='inp' type='text' style='-moz-user-select:text;width:" + this.obj.w + "px;'" + (a.value != null ? " value='" + a.value + "'" : "") + ">";
	var d = b,
	e = this;
	this.obj.childNodes[0].onkeydown =
	function (a) {
		a = a || event;
		a.keyCode == 13 && d.callEvent("onEnter", [e.obj.idd, this.value])
	};
	b.base.appendChild(this.obj);
	this.enableItem = function () {
		this.obj.childNodes[0].disabled = !1
	};
	this.disableItem = function () {
		this.obj.childNodes[0].disabled = !0
	};
	this.isEnabled = function () {
		return !this.obj.childNodes[0].disabled
	};
	this.showItem = function () {
		this.obj.style.display = ""
	};
	this.hideItem = function () {
		this.obj.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display != "none"
	};
	this.setValue = function (a) {
		this.obj.childNodes[0].value =
			a
	};
	this.getValue = function () {
		return this.obj.childNodes[0].value
	};
	this.setWidth = function (a) {
		this.obj.w = a;
		this.obj.childNodes[0].style.width = this.obj.w + "px"
	};
	this.getWidth = function () {
		return this.obj.w
	};
	this.setItemToolTip = function (a) {
		this.obj.title = a
	};
	this.getItemToolTip = function () {
		return this.obj.title
	};
	this.getInput = function () {
		return this.obj.firstChild
	};
	return this
};
dhtmlXToolbarObject.prototype._buttonTwoStateObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.state = a.enabled != null ? !1 : !0;
	this.imgEn = a.img != null ? a.img : "";
	this.imgDis = a.imgdis != null ? a.imgdis : "";
	this.img = this.state ? this.imgEn != "" ? this.imgEn : "" : this.imgDis != "" ? this.imgDis : "";
	this.obj = document.createElement("DIV");
	this.obj.pressed = a.selected != null;
	this.obj.extAction = a.action || null;
	this.obj.className = "dhx_toolbar_btn " + (this.obj.pressed ? "pres" + (this.state ? "" : "_dis") : this.state ? "def" : "dis");
	this.obj.style.display =
		a.hidden != null ? "none" : "";
	this.obj.renderAs = this.obj.className;
	this.obj.idd = String(c);
	this.obj.title = a.title || "";
	if (this.obj.pressed)
		this.obj.renderAs = "dhx_toolbar_btn over";
	this.obj.innerHTML = b._rtlParseBtn(this.img != "" ? "<img src='" + b.imagePath + this.img + "'>" : "", a.text != null ? "<div>" + a.text + "</div>" : "");
	b.base.appendChild(this.obj);
	var d = this;
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	this.obj.onmouseover = function () {
		this._doOnMouseOver()
	};
	this.obj.onmouseout = function () {
		this._doOnMouseOut()
	};
	this.obj._doOnMouseOver = function () {
		if (d.state != !1 && b.anyUsed == "none")
			this.renderAs = this.pressed ? "dhx_toolbar_btn over" : this.className = "dhx_toolbar_btn over"
	};
	this.obj._doOnMouseOut = function () {
		if (d.state != !1 && b.anyUsed == "none")
			this.renderAs = this.pressed ? "dhx_toolbar_btn def" : this.className = "dhx_toolbar_btn def"
	};
	this.obj[b._isIPad ? "ontouchstart" : "onmousedown"] = function () {
		if ((!b.checkEvent("onBeforeStateChange") || b.callEvent("onBeforeStateChange", [this.idd.replace(b.idPrefix, ""), this.pressed])) && d.state !=
			!1 && b.anyUsed == "none") {
			this.className = (this.pressed = !this.pressed) ? "dhx_toolbar_btn pres" : this.renderAs;
			var a = this.idd.replace(b.idPrefix, "");
			if (this.extAction)
				try {
					window[this.extAction](a, this.pressed)
				} catch (c) {}

			b.callEvent("onStateChange", [a, this.pressed]);
			return !1
		}
	};
	this.setItemState = function (a, c) {
		if (this.obj.pressed != a && (a == !0 ? (this.obj.pressed = !0, this.obj.className = "dhx_toolbar_btn pres" + (this.state ? "" : "_dis"), this.obj.renderAs = "dhx_toolbar_btn over") : (this.obj.pressed = !1, this.obj.className =
						"dhx_toolbar_btn " + (this.state ? "def" : "dis"), this.obj.renderAs = this.obj.className), c == !0)) {
			var d = this.obj.idd.replace(b.idPrefix, "");
			if (this.obj.extAction)
				try {
					window[this.obj.extAction](d, this.obj.pressed)
				} catch (i) {}

			b.callEvent("onStateChange", [d, this.obj.pressed])
		}
	};
	this.getItemState = function () {
		return this.obj.pressed
	};
	this.enableItem = function () {
		b._enableItem(this)
	};
	this.disableItem = function () {
		b._disableItem(this)
	};
	this.isEnabled = function () {
		return this.state
	};
	this.showItem = function () {
		this.obj.style.display =
			""
	};
	this.hideItem = function () {
		this.obj.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display == ""
	};
	this.setItemText = function (a) {
		b._setItemText(this, a)
	};
	this.getItemText = function () {
		return b._getItemText(this)
	};
	this.setItemImage = function (a) {
		b._setItemImage(this, a, !0)
	};
	this.clearItemImage = function () {
		b._clearItemImage(this, !0)
	};
	this.setItemImageDis = function (a) {
		b._setItemImage(this, a, !1)
	};
	this.clearItemImageDis = function () {
		b._clearItemImage(this, !1)
	};
	this.setItemToolTip = function (a) {
		this.obj.title =
			a
	};
	this.getItemToolTip = function () {
		return this.obj.title
	};
	return this
};
dhtmlXToolbarObject.prototype._sliderObject = function (b, c, a) {
	this.id = b.idPrefix + c;
	this.state = a.enabled != null ? a.enabled == "true" ? !0 : !1 : !0;
	this.obj = document.createElement("DIV");
	this.obj.className = "dhx_toolbar_btn " + (this.state ? "def" : "dis");
	this.obj.style.display = a.hidden != null ? "none" : "";
	this.obj.onselectstart = function (a) {
		a = a || event;
		a.returnValue = !1
	};
	this.obj.idd = String(c);
	this.obj.len = a.length != null ? Number(a.length) : 50;
	this.obj.innerHTML = "<div>" + (a.textMin || "") + "</div><div class='sl_bg_l'></div><div class='sl_bg_m' style='width:" +
		this.obj.len + "px;'></div><div class='sl_bg_r'></div><div>" + (a.textMax || "") + "</div>";
	b.base.appendChild(this.obj);
	var d = this;
	this.pen = document.createElement("DIV");
	this.pen.className = "sl_pen";
	this.obj.appendChild(this.pen);
	var e = this.pen;
	this.label = document.createElement("DIV");
	this.label.dir = "ltr";
	this.label.className = "dhx_toolbar_slider_label_" + b.skin + (b.rtl ? "_rtl" : "");
	this.label.style.display = "none";
	this.label.tip = a.toolTip || "%v";
	document.body.appendChild(this.label);
	var g = this.label;
	this.pen.valueMin =
		a.valueMin != null ? Number(a.valueMin) : 0;
	this.pen.valueMax = a.valueMax != null ? Number(a.valueMax) : 100;
	if (this.pen.valueMin > this.pen.valueMax)
		this.pen.valueMin = this.pen.valueMax;
	this.pen.valueNow = a.valueNow != null ? Number(a.valueNow) : this.pen.valueMax;
	if (this.pen.valueNow > this.pen.valueMax)
		this.pen.valueNow = this.pen.valueMax;
	if (this.pen.valueNow < this.pen.valueMin)
		this.pen.valueNow = this.pen.valueMin;
	this.pen._detectLimits = function () {
		this.minX = d.obj.childNodes[1].offsetLeft - 4;
		this.maxX = d.obj.childNodes[3].offsetLeft -
			this.offsetWidth + 1
	};
	this.pen._detectLimits();
	this.pen._definePos = function () {
		this.nowX = Math.round((this.valueNow - this.valueMin) * (this.maxX - this.minX) / (this.valueMax - this.valueMin) + this.minX);
		this.style.left = this.nowX + "px";
		this.newNowX = this.nowX
	};
	this.pen._definePos();
	this.pen.initXY = 0;
	this.pen.allowMove = !1;
	this.pen[b._isIPad ? "ontouchstart" : "onmousedown"] = function (a) {
		if (d.state != !1 && (a = a || event, this.initXY = b._isIPad ? a.touches[0].clientX : a.clientX, this.newValueNow = this.valueNow, this.allowMove = !0, this.className =
					"sl_pen over", g.tip != ""))
			g.style.visibility = "hidden", g.style.display = "", g.innerHTML = g.tip.replace("%v", this.valueNow), g.style.left = Math.round(getAbsoluteLeft(this) + this.offsetWidth / 2 - g.offsetWidth / 2) + "px", g.style.top = getAbsoluteTop(this) - g.offsetHeight - 3 + "px", g.style.visibility = ""
	};
	this.pen._doOnMouseMoveStart = function (a) {
		a = a || event;
		if (e.allowMove) {
			var c = b._isIPad ? a.touches[0].clientX : a.clientX,
			d = c - e.initXY;
			if (!(c < getAbsoluteLeft(e) + Math.round(e.offsetWidth / 2) && e.nowX == e.minX) && !(c > getAbsoluteLeft(e) +
					Math.round(e.offsetWidth / 2) && e.nowX == e.maxX)) {
				e.newNowX = e.nowX + d;
				if (e.newNowX < e.minX)
					e.newNowX = e.minX;
				if (e.newNowX > e.maxX)
					e.newNowX = e.maxX;
				e.nowX = e.newNowX;
				e.style.left = e.nowX + "px";
				e.initXY = c;
				e.newValueNow = Math.round((e.valueMax - e.valueMin) * (e.newNowX - e.minX) / (e.maxX - e.minX) + e.valueMin);
				if (g.tip != "")
					g.innerHTML = g.tip.replace(/%v/gi, e.newValueNow), g.style.left = Math.round(getAbsoluteLeft(e) + e.offsetWidth / 2 - g.offsetWidth / 2) + "px", g.style.top = getAbsoluteTop(e) - g.offsetHeight - 3 + "px";
				a.cancelBubble = !0;
				return a.returnValue =
					!1
			}
		}
	};
	this.pen._doOnMouseMoveEnd = function () {
		if (e.allowMove) {
			e.className = "sl_pen";
			e.allowMove = !1;
			e.nowX = e.newNowX;
			e.valueNow = e.newValueNow;
			if (g.tip != "")
				g.style.display = "none";
			b.callEvent("onValueChange", [d.obj.idd.replace(b.idPrefix, ""), e.valueNow])
		}
	};
	b._isIPad ? (document.addEventListener("touchmove", e._doOnMouseMoveStart, !1), document.addEventListener("touchend", e._doOnMouseMoveEnd, !1)) : _isIE ? (document.body.attachEvent("onmousemove", e._doOnMouseMoveStart), document.body.attachEvent("onmouseup", e._doOnMouseMoveEnd)) :
	(window.addEventListener("mousemove", e._doOnMouseMoveStart, !1), window.addEventListener("mouseup", e._doOnMouseMoveEnd, !1));
	this.enableItem = function () {
		if (!this.state)
			this.state = !0, this.obj.className = "dhx_toolbar_btn def"
	};
	this.disableItem = function () {
		if (this.state)
			this.state = !1, this.obj.className = "dhx_toolbar_btn dis"
	};
	this.isEnabled = function () {
		return this.state
	};
	this.showItem = function () {
		this.obj.style.display = ""
	};
	this.hideItem = function () {
		this.obj.style.display = "none"
	};
	this.isVisible = function () {
		return this.obj.style.display ==
		""
	};
	this.setValue = function (a, c) {
		a = Number(a);
		if (a < this.pen.valueMin)
			a = this.pen.valueMin;
		if (a > this.pen.valueMax)
			a = this.pen.valueMax;
		this.pen.valueNow = a;
		this.pen._definePos();
		c == !0 && b.callEvent("onValueChange", [this.obj.idd.replace(b.idPrefix, ""), this.pen.valueNow])
	};
	this.getValue = function () {
		return this.pen.valueNow
	};
	this.setMinValue = function (a, b) {
		a = Number(a);
		if (!(a > this.pen.valueMax)) {
			this.obj.childNodes[0].innerHTML = b;
			this.obj.childNodes[0].style.display = b.length > 0 ? "" : "none";
			this.pen.valueMin = a;
			if (this.pen.valueNow <
				this.pen.valueMin)
				this.pen.valueNow = this.pen.valueMin;
			this.pen._detectLimits();
			this.pen._definePos()
		}
	};
	this.setMaxValue = function (a, b) {
		a = Number(a);
		if (!(a < this.pen.valueMin)) {
			this.obj.childNodes[4].innerHTML = b;
			this.obj.childNodes[4].style.display = b.length > 0 ? "" : "none";
			this.pen.valueMax = a;
			if (this.pen.valueNow > this.pen.valueMax)
				this.pen.valueNow = this.pen.valueMax;
			this.pen._detectLimits();
			this.pen._definePos()
		}
	};
	this.getMinValue = function () {
		var a = this.obj.childNodes[0].innerHTML,
		b = this.pen.valueMin;
		return [b,
			a]
	};
	this.getMaxValue = function () {
		var a = this.obj.childNodes[4].innerHTML,
		b = this.pen.valueMax;
		return [b, a]
	};
	this.setItemToolTipTemplate = function (a) {
		this.label.tip = a
	};
	this.getItemToolTipTemplate = function () {
		return this.label.tip
	};
	return this
};
dhtmlXToolbarObject.prototype.unload = function () {
	this._isIPad ? document.removeEventListener("touchstart", this._doOnClick, !1) : _isIE ? document.body.detachEvent("onclick", this._doOnClick) : window.removeEventListener("click", this._doOnClick, !1);
	this._doOnClick = null;
	this.clearAll();
	this.objPull = null;
	if (this._xmlLoader)
		this._xmlLoader.destructor(), this._xmlLoader = null;
	for (; this.base.childNodes.length > 0; )
		this.base.removeChild(this.base.childNodes[0]);
	this.cont.removeChild(this.base);
	for (this.base = null; this.cont.childNodes.length >
		0; )
		this.cont.removeChild(this.cont.childNodes[0]);
	this.cont.className = "";
	this.cont = null;
	this.detachAllEvents();
	this.items = this.setMaxOpen = this.getUserData = this.setUserData = this.unload = this.getListOptionSelected = this.setListOptionSelected = this.getAllListOptions = this.forEachListOption = this.clearListOptionImage = this.getListOptionImage = this.setListOptionImage = this.getListOptionToolTip = this.setListOptionToolTip = this.getListOptionText = this.setListOptionText = this.getListOptionPosition = this.setListOptionPosition =
		this.isListOptionEnabled = this.disableListOption = this.enableListOption = this.isListOptionVisible = this.hideListOption = this.showListOption = this.removeListOption = this.addListOption = this.removeItem = this.setPosition = this.getPosition = this.getWidth = this.setWidth = this.getMaxValue = this.setMaxValue = this.getMinValue = this.setMinValue = this.getValue = this.setValue = this.getItemToolTipTemplate = this.setItemToolTipTemplate = this.getItemState = this.setItemState = this.clearItemImageDis = this.clearItemImage = this.setItemImageDis =
		this.setItemImage = this.getItemToolTip = this.setItemToolTip = this.getItemText = this.setItemText = this.isEnabled = this.disableItem = this.enableItem = this.isVisible = this.hideItem = this.showItem = this.forEachItem = this.addInput = this.addSlider = this.addSeparator = this.addButtonTwoState = this.addButtonSelect = this.addText = this.addButton = this.getParentId = this.inArray = this.getTypeExt = this.getType = this.removeSpacer = this.addSpacer = this.clearAll = this.detachAllEvents = this.detachEvent = this.eventCatcher = this.checkEvent = this.callEvent =
		this.attachEvent = this.loadXMLString = this.loadXML = this.setIconPath = this.setIconsPath = this.setSkin = this.setAlign = this._removeItem = this._autoDetectVisibleArea = this._sliderObject = this._buttonTwoStateObject = this._buttonInputObject = this._buttonSelectObject = this._buttonObject = this._textObject = this._separatorObject = this._getIdByPosition = this._setPosition = this._getPosition = this._addItem = this._genStr = this._addItemToStorage = this._doOnLoad = this._xmlParser = this._disableItem = this._enableItem = this._getItemText =
		this._setItemText = this._clearItemImage = this._setItemImage = this._addImgObj = this._getObj = this._sbw = this.setRTL = this._rtlParseBtn = this._rtl = this.skin = this.selectPolygonOffsetTop = this.selectPolygonOffsetLeft = this.rootTypes = this.imagePath = this.idPrefix = this.anyUsed = this.align = this._isWebToolbar = this._isIE6 = this.tY2 = this.tY1 = this.tX2 = this.tX1 = null
};
dhtmlXToolbarObject.prototype._autoDetectVisibleArea = function () {
	this.tX1 = document.body.scrollLeft;
	this.tX2 = this.tX1 + (window.innerWidth || document.body.clientWidth);
	this.tY1 = Math.max((_isIE ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
	this.tY2 = this.tY1 + (_isIE ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0, document.body.clientHeight || 0) : window.innerHeight)
};
dhtmlXToolbarObject.prototype.setUserData = function (b, c, a) {
	if (this.objPull[this.idPrefix + b] != null) {
		var d = this.objPull[this.idPrefix + b];
		if (d.userData == null)
			d.userData = {};
		d.userData[c] = a
	}
};
dhtmlXToolbarObject.prototype.getUserData = function (b, c) {
	return this.objPull[this.idPrefix + b] == null ? null : this.objPull[this.idPrefix + b].userData == null ? null : this.objPull[this.idPrefix + b].userData[c] == null ? null : this.objPull[this.idPrefix + b].userData[c]
};
dhtmlXToolbarObject.prototype._isListOptionExists = function (b, c) {
	if (this.objPull[this.idPrefix + b] == null)
		return !1;
	var a = this.objPull[this.idPrefix + b];
	return a.type != "buttonSelect" ? !1 : a._listOptions[c] == null ? !1 : !0
};
dhtmlXToolbarObject.prototype.setListOptionUserData = function (b, c, a, d) {
	if (this._isListOptionExists(b, c)) {
		var e = this.objPull[this.idPrefix + b]._listOptions[c];
		if (e.userData == null)
			e.userData = {};
		e.userData[a] = d
	}
};
dhtmlXToolbarObject.prototype.getListOptionUserData = function (b, c, a) {
	if (!this._isListOptionExists(b, c))
		return null;
	var d = this.objPull[this.idPrefix + b]._listOptions[c];
	return !d.userData ? null : d.userData[a] ? d.userData[a] : null
};
(function () {
	dhtmlx.extend_api("dhtmlXToolbarObject", {
		_init : function (b) {
			return [b.parent, b.skin]
		},
		icon_path : "setIconsPath",
		xml : "loadXML",
		items : "items",
		align : "setAlign",
		rtl : "setRTL",
		skin : "setSkin"
	}, {
		items : function (b) {
			for (var c = 0; c < b.length; c++) {
				var a = b[c];
				a.type == "button" && this.addButton(a.id, null, a.text, a.img, a.img_disabled);
				a.type == "separator" && this.addSeparator(a.id, null);
				a.type == "text" && this.addText(a.id, null, a.text);
				a.type == "buttonSelect" && this.addButtonSelect(a.id, null, a.text, a.options, a.img, a.img_disabled,
					a.renderSelect, a.openAll, a.maxOpen);
				a.type == "buttonTwoState" && this.addButtonTwoState(a.id, null, a.text, a.img, a.img_disabled);
				a.type == "buttonInput" && this.addInput(a.id, null, a.text);
				a.type == "slider" && this.addSlider(a.id, null, a.length, a.value_min, a.value_max, a.value_now, a.text_min, a.text_max, a.tip_template);
				a.width && this.setWidth(a.id, a.width);
				a.disabled && this.disableItem(a.id);
				a.tooltip && this.setItemToolTip(a.id, a.tooltip);
				a.pressed === !0 && this.setItemState(a.id, !0)
			}
		}
	})
})();

//v.3.5 build 120822

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
To use this component please contact sales@dhtmlx.com to obtain license
*/
