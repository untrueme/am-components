import { LitElement, html, css } from 'lit';
import * as ChartJs from 'chart.js/dist/chart.esm.js';
ChartJs.Chart.register.apply(null, Object.values(ChartJs).filter((chartClass) => (chartClass.id)));

class LitChart extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
                box-sizing: border-box;
            }

            .container {
                position: relative;
            }

            .donut-inner {
                position: absolute;
                top: 33%;
                left: 33%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .donut-inner h5 {
                margin-bottom: 5px;
                margin-top: 0;
            }

            .donut-inner .title {
                font-size: 18px;
                font-weight: 500;
                line-height: 150%;
                color: var(--black)

            }

            .donut-inner .title2 {
                font-size: 14px;
                font-weight: 500;
                line-height: 150%;
                color: var(--black)

            }
            .donut-inner .subtitle {
                font-size: 12px;
                font-weight: 500;
                line-height: 150%;
                color: var(--grey-dark)
            }

            .divider {
                width: 100px;
                border-top: 0.944444px solid #E1E5EB;
            }
		`;
    }

    render() {
        return html`
            <div class="container">
                <canvas  id="myChart"></canvas>
                <div class="donut-inner">
                    <span class="subtitle">Всего</span>
                    <span class="title">767 027</span>
                    <span class="divider"></span>
                    <span class="title2">514 209</span>
                    <span class="subtitle">Выбрано</span>
                </div>
            </div>
		`;
    }

    firstUpdated(args) {
        super.firstUpdated(args);
        const canvas = this.shadowRoot.querySelector('#myChart');

        new ChartJs.Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: [
                    'One',
                    'Two',
                    'Three',
                    'Four',
                    'Five'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [50, 50, 50, 50, 50],
                    backgroundColor: [
                        '#5F81BE',
                        '#80BEE1',
                        '#AFE4D6',
                        '#9B7BEB',
                        '#A1CD9B'
                    ]
                }],
            },
            options: {
                spacing: 0,
                cutout: 55,
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        position: 'top',
                        text: 'Chart.js Doughnut Chart'
                    }
                }
            }
        });
    }
}

customElements.define('lit-chart', LitChart);
