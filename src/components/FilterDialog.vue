<template>
    <div class="mask" v-if="showDialog">
        <div class="container">
            <div class="justify-center title">
                <span>Filters</span>
            </div>
            <div class="scroll-container">
                <div class="justify-start section-title">
                    <span>Price range</span>
                </div>
                <div class="justify-start range-text">
                    <span>$700,000 - $4,000,000</span>
                </div>
                <div class="flex-row range-btn" style="height: 50px;">
                    <div class="line"></div>
                    <div class="line active"></div>
                    <div class="circle start"></div>
                    <div class="circle end"></div>
                </div>
                <div class="divider"></div>
                <div class="justify-start section-title">
                    <span>Description Contains Keywords</span>
                </div>
                <input class="keyword-input" placeholder="Waterfront, Pool, Fireplace..." v-model="keywords">
                <div class="divider"></div>
                <div class="justify-start section-title">
                    <span>Bedrooms</span>
                </div>
                <div class="justify-between items-center select-btns">
                    <div v-for="(item, index) in bedrooms" :key="index" class="select-btn"
                        :class="{ active: bedroom.includes(item) }" @click="setBedroom(item)">
                        <span>{{ item }}</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="justify-start section-title">
                    <span>Bathroom</span>
                </div>
                <div class="justify-between items-center select-btns">
                    <div v-for="(item, index) in bathrooms" :key="index" class="select-btn"
                        :class="{ active: item === bathroom }" @click="setBathroom(item)">
                        <span>{{ item }}</span>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="justify-start section-title">
                    <span>Garage/Parking</span>
                </div>
                <div class="justify-between items-center select-btns last">
                    <div v-for="(item, index) in garages" :key="index" class="select-btn"
                        :class="{ active: item === garage }" @click="setGarage(item)">
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="flex-row justify-end bottom-container">
                <span class="text" @click="clear">Clear</span>
                <span class="text" @click="apply">Apply</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import { defaultFilterState, useFilterStore } from '../pinia';

interface Props {
    show: boolean
}

const props = withDefaults(defineProps<Props>(), {
    show: false
})

const { show } = toRefs(props)

const bedrooms = ref(['Any', '0', '1', '2', '3', '4', '5+'])
const bathrooms = ref(['Any', '1+', '2+', '3+', '4+', '5+'])
const garages = ref(['Any', '1+', '2+', '3+', '4+', '5+'])
const showDialog = ref(props.show)
watch(show, (nVal: boolean, oVal) => {
    showDialog.value = nVal
}, { immediate: true })

const filterStore = useFilterStore()
const filterState = filterStore.getFilterState()
const priceMin = ref(filterState.priceMin)
const priceMax = ref(filterState.priceMax)
const keywords = ref(filterState.keywords)
const bedroom = ref(filterState.bedroom)
const bathroom = ref(filterState.bathroom)
const garage = ref(filterState.garage)
const emit = defineEmits(['apply', 'clear'])

function setBedroom(item: string) {
    if (item === 'Any') {
        bedroom.value = ['Any']
        return
    }
    if (!bedroom.value.includes(item)) {
        if (bedroom.value.includes('Any')) bedroom.value = []
        bedroom.value.push(item)
    }
}

function setBathroom(item: string) {
    bathroom.value = item
}

function setGarage(item: string) {
    garage.value = item
}

function apply() {
    const state = {
        priceMin: priceMin.value,
        priceMax: priceMax.value,
        keywords: keywords.value,
        bedroom: bedroom.value,
        bathroom: bathroom.value,
        garage: garage.value
    }
    filterStore.setFilterState(state)
    emit('apply', state)
    showDialog.value = false

}

function clear() {
    priceMin.value = defaultFilterState.priceMin
    priceMax.value = defaultFilterState.priceMax
    keywords.value = defaultFilterState.keywords
    bedroom.value = defaultFilterState.bedroom
    bathroom.value = defaultFilterState.bathroom
    garage.value = defaultFilterState.garage
    filterStore.setFilterState(defaultFilterState)
    emit('clear', defaultFilterState)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
}

.container {
    width: 100%;
    height: 717px;
    background: $color-white;
    box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(27.1828px);
    border-radius: 20px 20px 0 0;
    position: fixed;
    bottom: 0;
    padding: 0 5px 0 20px;
}

.title {
    margin: 30px 0 20px 0;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: $color-black;
}

.scroll-container {
    width: 100%;
    height: 550px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 15px 0 0;
}

.scroll-container::-webkit-scrollbar {
    width: 4px;
}

.scroll-container::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.18);
}

.scroll-container::-webkit-scrollbar-thumb {
    background-color: $color-cyan-strong;
}

.section-title {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: $color-black;
    margin-bottom: 16px;
}

.range-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $color-black;
    margin-bottom: 16px;
}

.keyword-input {
    mix-blend-mode: normal;
    border: 1px solid rgba(0, 0, 0, 0.18);
    border-radius: 5px;
    margin-bottom: 16px;
    padding: 12px 10px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: $color-black;
    width: 100%;
}

.select-btns {
    margin-bottom: 16px;
}

.select-btns.last {
    margin-bottom: 26px;
}

.select-btn {
    padding: 7px 10px;
    border-radius: 4px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.select-btn.active {
    background: #28A3B3;
    color: $color-white;
}

.divider {
    width: 100%;
    height: 1px;
    margin-bottom: 16px;
    background-color: $color-gray-gray;
}

.bottom-container {
    padding: 60px 30px 40px 0;
    background-image: url('../assets/filter-bottom.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
}

.bottom-container .text {
    margin-left: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: $color-cyan-strong;
}

.range-btn {
    height: 25px;
    padding: 10px 0;
    position: relative;
}

.range-btn .line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: $color-gray-gray;
}

.range-btn .line.active {
    width: 194px;
    height: 2px;
    position: absolute;
    left: 155px;
    top: 10px;
    background: $color-cyan-strong;
}

.range-btn .circle {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 146px;
    top: 0;
    background: $color-white;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
}

.range-btn .circle.end {
    left: 350px;
    top: 0;
}
</style>