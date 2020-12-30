(function() { 

	(function(){



	let template = document.createElement("template");
	template.innerHTML = `
			<script src="https://d3js.org/d3.v6.min.js"></script>
			<svg id="fillgauge1" width="97%" height="250"></svg>
		`;

	class d3LiquidFill extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this.addEventListener("load", event => {
				var event = new Event("onLoad");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		connectedCallback(){
			
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };

		}

		onCustomWidgetAfterUpdate(changedProperties) {
			console.log("onCustomWidgetAfterUpdate")
			console.log("this._props prop = ", this._props);
			this._props = { ...this._props, ...changedProperties };

			var ctx = this.shadowRoot.getElementById('chart_div');

			var myProps = this._props
			
			google.charts.load('current', {'packages':['gauge']});
			google.charts.setOnLoadCallback(function() {
				drawGauge(myProps);
			});
			console.log("changedProperties = ", changedProperties);

			function drawGauge(props) {
				console.log("props =", props)
				loadLiquidFillGauge("fillgauge1", props.value);
			}
		}
	}

	customElements.define("com-sap-sample-d3", d3LiquidFill);
})();