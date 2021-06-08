import { LitElement, html, css } from 'lit';
import * as ChartJs from 'chart.js/dist/chart.esm.js';
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

class LitChart extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                width:100%;
                height: 100%;
            }
			#myChart {
				display: block;
				border: solid 1px gray;
				padding: 16px;
			}
		`;
    }

    render() {
        return html`
            <canvas id="myChart"></canvas>
		`;
    }

    firstUpdated(args) {
        super.firstUpdated(args);
        const canvas = this.shadowRoot.querySelector('#myChart');
        new ChartJs.Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

customElements.define('lit-chart', LitChart);
