
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ 
  data: Map<string, string[]>
  legend: { name: string, color: string }[] 
  checked: Set<string>
  
}>()

const canvas1 = ref()
let chart = null

const drawGraph = (normalize: boolean) => {
  if (chart) {
    (chart as any).destroy()
  }
  const ctx = canvas1.value
  const keys = [...props.data.keys()]

  const datasets: any[] = []

  for (const key of keys) {
    if (!props.checked.has(key)) continue
    const color = props.legend.find(p => p.name === key)?.color ?? '#333'
    
    const points = props.data.has(key) ? props.data.get(key)!.map((v, i) => ({ x: i, y: +v })) : []
    if (normalize) {
    const ys = points.map(p => p.y)
    const min = Math.min(...ys)
    const d = Math.max(...ys) - min
    points.forEach(p=>p.y = (p.y - min) / d)
    }

    const dataset = {
      label: key,
      data: points,
      borderColor: color,
      tension: 0.1,
      pointRadius: 0
    }

    datasets.push(dataset)
  }

  const datasetsStr = JSON.stringify(datasets)
  
  eval(`
  chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: `+
            datasetsStr
            +
            `
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
    legend: {
      display: false
    }
  },
            scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'frames'
                },
                grid: {
                  color: '#aaa'  
                },
                ticks: {
                  color: '#bbb' 
                }

            },
            y: {
                title: {
                  display: true,
                  text: 'value'
                },
                grid: {
                  color: '#aaa'  
                },
                ticks: {
                  color: '#bbb' 
                }
            }
        }
        }
    });
  `)
}

onMounted (() => drawGraph(false))
defineExpose({ drawGraph })
</script>
<template>
  <div>

<canvas ref="canvas1" style="height: 52vh; width: 55vw;"></canvas>
</div>
</template>