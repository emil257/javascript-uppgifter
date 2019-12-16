(function ($) {
  'use strict';
  $(function () {
    let userFirstname = 'Don'
    let userLastname = 'Richards'

    fetch('https://inlupp-fa.azurewebsites.net/api/messages')
      .then(res => res.json())
      .then(data => {
        $('#messages').empty()
        $('#messages').append(`<p class="mb-0 font-weight-normal float-left dropdown-header">Messages</p>`)
        for (let message of data) {
          $('#messages').append(`
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
            </div>
            <div class="preview-item-content flex-grow">
              <h6 class="preview-subject ellipsis font-weight-normal">${message.from}</h6>
              <p class="font-weight-light small-text text-muted mb-0">
                ${message.title}
              </p>
            </div>
          </a>
          `)
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
      .then(res => res.json())
      .then(data => {
        $('#notInfo').empty()
        $('#notInfo').append(`<p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>`)
        for (let not of data) {
          $('#notInfo').append(
            `
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon ${getNotIcon(not.title)[0]}">
                <i class="mdi ${getNotIcon(not.title)[1]} mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">${not.title}</h6>
              <p class="font-weight-light small-text mb-0 text-muted">
                ${not.subtitle}
              </p>
            </div>
          </a>
          `)
        }
      })

    fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${userFirstname}&lastname=${userLastname}`)
      .then(res => res.text())
      .then(data => {
        $('#profileName').innerHTML = data;
        $('#welcomeMsg').text(`Hi ${data.split(' ')[0]}, welcomeback!`)
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
      .then(res => res.json())
      .then(data => {
        $('#totalUsers').text(data.users.toLocaleString())
        $('#totalUsersGrowth').text(`+${data.growth}%`)
        if ($("#users-chart").length) {
          var areaData = {
            labels: data.dataset.labels,
            datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                '#e0fff4'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: "purchases"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }

        if ($("#users-chart-dark").length) {
          var areaData = {
            labels: data.dataset.labels,
            datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                'rgba(0, 198, 137, .1)'
              ],
              borderWidth: 2,
              borderColor: "#00c689",
              fill: 'origin',
              label: "purchases"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart-dark").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/total-projects')
      .then(res => res.json())
      .then(data => {
        $('#totalProjects').text(data.projects + '%')
        $('#totalProjectsGrowth').text(`+${data.growth}%`)
        if ($("#projects-chart").length) {
          var areaData = {
            labels: data.dataset.labels,
            datasets: [{
              data: data.dataset.data,
              backgroundColor: [
                '#e5f2ff'
              ],
              borderWidth: 2,
              borderColor: "#3da5f4",
              fill: 'origin',
              label: "purchases"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .05
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
          if ($("#projects-chart-dark").length) {
            var areaData = {
              labels: data.dataset.labels,
              datasets: [{
                data: data.dataset.data,
                backgroundColor: [
                  'rgba(61, 165, 244, .1)'
                ],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: 'origin',
                label: "purchases"
              }
              ]
            };
            var areaOptions = {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                filler: {
                  propagate: false
                }
              },
              scales: {
                xAxes: [{
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              elements: {
                line: {
                  tension: .05
                },
                point: {
                  radius: 0
                }
              }
            }
            var salesChartCanvas = $("#projects-chart-dark").get(0).getContext("2d");
            var salesChart = new Chart(salesChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart')
      .then(res => res.json())
      .then(data => {
        $('#total-sales-chart-revenue').text(leftFillNum(data.revenue, 5))
        $('#total-sales-chart-returns').text(leftFillNum(data.returns, 5))
        $('#total-sales-chart-queries').text(leftFillNum(data.queries, 5))
        $('#total-sales-chart-invoices').text(leftFillNum(data.invoices, 5))
        if ($("#total-sales-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [
              {
                data: data.datasets[0].data,
                backgroundColor: [
                  'rgba(61, 165, 244, .0)'
                ],
                borderColor: [
                  'rgb(61, 165, 244)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: "services"
              },
              {
                data: data.datasets[1].data,
                backgroundColor: [
                  'rgba(241, 83, 110, .0)'
                ],
                borderColor: [
                  'rgb(241, 83, 110)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: "services"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor: "#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function (value) {
                    var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                    ];
                    function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                          return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .37
              },
              point: {
                radius: 0
              }
            }
          }
          var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/downloads')
      .then(res => res.json())
      .then(data => {
        $('#offlineDownloads').text(data[0].offlineAmount.toLocaleString())
        $('#onlineDownloads').text(data[1].onlineAmount.toLocaleString())
        if ($('#offlineProgress').length) {
          var bar = new ProgressBar.Circle(offlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#f1536e',
              width: 6
            },
            to: {
              color: '#f1536e',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[0].circleValue); // Number from 0.0 to 1.0
        }
        if ($('#onlineProgress').length) {
          var bar = new ProgressBar.Circle(onlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#fda006',
              width: 6
            },
            to: {
              color: '#fda006',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[1].circleValue); // Number from 0.0 to 1.0
        }
        if ($('#offlineProgressDark').length) {
          var bar = new ProgressBar.Circle(offlineProgressDark, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#131633",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#f1536e',
              width: 6
            },
            to: {
              color: '#f1536e',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[0].circleValue); // Number from 0.0 to 1.0
        }
        if ($('#onlineProgressDark').length) {
          var bar = new ProgressBar.Circle(onlineProgressDark, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#131633",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#fda006',
              width: 6
            },
            to: {
              color: '#fda006',
              width: 6
            },
            // Set default step function for all animate calls
            step: function (state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }

            }
          });

          bar.text.style.fontSize = '1rem';
          bar.animate(data[1].circleValue); // Number from 0.0 to 1.0
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/updates')
      .then(res => res.json())
      .then(data => {
        $('#updatesList').empty()
        for (let update of data)
          $('#updatesList').append(`
            <li>
              <h6>${update.title}</h6>
              <p class="mt-2">${update.message}</p>
              <p class="text-muted mb-4">
                <i class="mdi mdi-clock-outline"></i>
                ${update.time}
              </p>
            </li>
          `)
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/distribution')
      .then(res => res.json())
      .then(data => {
        if ($("#distribution-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [{
              data: data.data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              cities: data.cities,
              borderColor: "rgba(0,0,0,0)"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[0] + '</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[1] + '</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[2] + '</p>');
              text.push('</div>');
              text.push('</div>');
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";

              var text = data.procentage + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }
        if ($("#distribution-chart-dark").length) {
          var areaData = {
            labels: data.labels,
            datasets: [{
              data: data.data,
              backgroundColor: [
                "#00c689", "#3da5f4", "#f1536e"
              ],
              cities: data.cities,
              borderColor: "rgba(0,0,0,0)"
            }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[0] + '</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[1] + '</p>');
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
              text.push('<p>' + chart.data.datasets[0].cities[2] + '</p>');
              text.push('</div>');
              text.push('</div>');
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#fff";

              var text = data.procentage + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart-dark").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/sales-report')
      .then(res => res.json())
      .then(data => {
        $('#sales-report-downloads').text(data.downloads)
        $('#sales-report-purchases').text(data.purchases)
        $('#sales-report-users').text(data.users)
        $('#sales-report-growth').text(data.growth)
        if ($("#sale-report-chart").length) {
          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: data.labels,
              datasets: [{
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: ["#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4", "#e0f2ff", "#3da5f4"]
              }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
        if ($("#sale-report-chart-dark").length) {
          var CurrentChartCanvas = $("#sale-report-chart-dark").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: data.labels,
              datasets: [{
                label: data.datasets[0].label,
                data: data.datasets[0].data,
                backgroundColor: ["#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4"]
              }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(255, 255, 255, .1)",
                    zeroLineColor: "rgba(255, 255, 255, .1)"
                  },
                  ticks: {
                    fontColor: "#b1b1b5",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#b1b1b5",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
      })

    fetch('https://inlupp-fa.azurewebsites.net/api/open-invoices')
      .then(res => res.json())
      .then(data => {
        $('#invoicesTable').empty()
        for (let inv of data) {
          $('#invoicesTable').append(`
          <tr>
            <td>${inv.invoice}</td>
            <td>${inv.customer}</td>
            <td>${inv.shipping}</td>
            <td class="font-weight-bold">${inv.currency + inv.bestPrice}</td>
            <td>${inv.currency + inv.purchasedPrice}</td >
          <td>
            <div class="badge ${formatStatus(inv.status)} badge-fw">${inv.status}</div>
          </td>
          </tr >
          `)
        }
      })


    $('#tickets-2017').click(function (e) {
      e.preventDefault();
      $('#dropdownMenuDate1').text('2017')
      getTickets(0)
    });
    $('#tickets-2018').click(function (e) {
      e.preventDefault();
      $('#dropdownMenuDate1').text('2018')
      getTickets(1)
    });
    $('#tickets-2019').click(function (e) {
      e.preventDefault();
      $('#dropdownMenuDate1').text('2019')
      getTickets(2)
    });

    formatSales('Sales', 'https://inlupp-fa.azurewebsites.net/api/total-sales')
    formatSales('Purchases', 'https://inlupp-fa.azurewebsites.net/api/total-purchases')
    formatSales('Orders', 'https://inlupp-fa.azurewebsites.net/api/total-orders')
    formatSales('Growth', 'https://inlupp-fa.azurewebsites.net/api/total-growth')

    function getTickets(year) {
      fetch('https://inlupp-fa.azurewebsites.net/api/tickets')
        .then(res => res.json())
        .then(data => {
          $('#tickets-table').text('')
          for (let ticket of data[year].tickets) {
            $('#tickets-table').append(`
            <tr>
              <td class="pl-0">
                <div class="${genRandomIconBackground()} icon-rounded-md">
                  <h4 class="font-weight-medium">${ticket.name.split(' ')[0].charAt(0) + ticket.name.split(' ')[1].charAt(0)}</h4 >
                </div >
              </td >
              <td>
                <p class="mb-0">${ticket.name}</p>
                <p class="text-muted mb-0">${ticket.city}</p>
              </td>
              <td>
                <p class="mb-0">${ticket.date.split(',')[0]}</p>
                <p class="text-muted mb-0">${ticket.date.split(',')[1]}</p>
              </td>
              <td>
                <p class="mb-0">${ticket.project}</p>
                <p class="text-muted mb-0">${ticket.other}</p>
              </td>
              <td class="pr-0">
                <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
              </td>
            </tr >
              `)
          }
        })
    }
    function genRandomIconBackground() {
      let rnd = Math.floor(Math.random() * 4);
      if (rnd === 0)
        return 'icon-rounded-primary'
      if (rnd === 1)
        return 'icon-rounded-info'
      if (rnd === 2)
        return 'icon-rounded-danger'
      if (rnd === 3)
        return 'icon-rounded-warning'
    }
    function formatStatus(status) {
      if (status === 'Progress')
        return 'badge-success'
      if (status === 'Open')
        return 'badge-warning'
      if (status === 'On hold')
        return 'badge-danger'
      if (status === 'Closed')
        return 'badge-dark'
    }
    function getNotIcon(icon) {
      if (icon === 'Application Error')
        return ['bg-success', 'mdi-information']
      if (icon === 'Settings')
        return ['bg-warning', 'mdi-settings']
      if (icon === 'New user registration')
        return ['bg-info', 'mdi-account-box']
    }
    function formatSales(id, url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          $('#total' + id).text(data.currency + data.amount)
          document.getElementById('total' + id).innerHTML = data.currency + data.amount
        })
    }
    function leftFillNum(num, targetLength) {
      return num.toString().padStart(targetLength, 0).toLocaleString();
    }
  });
})(jQuery);
