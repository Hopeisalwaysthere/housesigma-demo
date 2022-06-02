<template>
    <div class="page">
        <div class="">
            <div class="header">
                <div class="justify-between items-center header-operates">
                    <img src="../assets/back.png" class="back" />
                    <div class="justify-between search-box">
                        <div class="flex-row">
                            <img src="../assets/search-white.png" class="search" />
                            <span class="placeholder-text">Ontario, ON</span>
                        </div>
                        <img src="../assets/cancel.png" class="cancel" />
                    </div>
                    <img src="../assets/watch.png" class="watch" />
                    <span class="watch-text">Watch</span>
                </div>
                <div class="justify-around filter-group">
                    <div class="justify-start items-center filter-item">
                        <span class="filter-text">All Property Types</span>
                        <img src="../assets/select.png" class="select-icon" />
                    </div>
                    <div class="justify-start items-center filter-item">
                        <div class="circle">
                            <!--*-->
                        </div>
                        <div class="filter-text"><span class="text_3">3d</span></div>
                        <div class="circle bule">
                            <!--*-->
                        </div>
                        <div class="filter-text"><span class="text_4">3d</span></div>
                        <img src="../assets/select.png" class="select-icon" />
                    </div>
                    <div class="justify-start items-center filter-item" @click="showFilter">
                        <span class="filter-text">Filters</span>
                        <img src="../assets/select.png" class="select-icon" />
                    </div>
                </div>
            </div>
            <div class="flex-row justify-center status-tags">
                <div class="flex-row justify-start">
                    <div class="status-tag for-sale-tag">For Sale</div>
                    <div class="status-tag sold-tag">Sold</div>
                    <div class="status-tag de-listed-tag">De-listed</div>
                </div>
            </div>
        </div>
        <filter-dialog :show="showFilterDialog" @apply="apply"></filter-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FilterDialog from '../components/FilterDialog.vue';
// import { Loader } from '@googlemaps/js-api-loader';

const showFilterDialog = ref(false)

function showFilter() {
    showFilterDialog.value = true
}

function apply() {
    showFilterDialog.value = false
}

// const loader = new Loader({
//   apiKey: "",
//   version: "weekly",
//   libraries: ["places"]
// });

// const mapOptions = {
//   center: {
//     lat: 0,
//     lng: 0
//   },
//   zoom: 8
// };

// loader.load().then((google) => {
//     new google.maps.Map(document.getElementById("map"), mapOptions);
// })
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.header {
    background-color: $color-cyan-strong;
    height: auto;
}

.header-operates {
    padding: 5px 0 1px 0;
}

.header-operates .back {
    margin: 9px;
    width: 12px;
    height: 21px;
}

.header-operates .search-box {
    margin: 0 auto 0 0;
    width: 260px;
    height: 40px;
    background: rgba(0, 0, 0, 0.2);
    mix-blend-mode: normal;
    border-radius: 10px;
    padding: 8px;
    flex-grow: 1;
}

.header-operates .search-box .search {
    margin: 4px 8px 4px 8px;
    width: 16px;
    height: 16px;
}

.header-operates .search-box .placeholder-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: $color-white;
}

.header-operates .search-box .cancel {
    margin: 4px;
    width: 20px;
    height: 20px;
}

.header-operates .watch {
    margin: 6px 10px;
    width: 21px;
    height: 24px;
}

.header-operates .watch-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: $color-white;
    margin-right: 16px;
}

.filter-group {
    padding: 9px;
}

.filter-group .filter-item {
    border: 1px solid $color-white;
    border-radius: 33px;
    padding: 5px 10px;
}

.filter-group .filter-text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: $color-white;
}

.filter-item .select-icon {
    width: 7px;
    height: 4px;
    margin-left: 10px;
}

.filter-item .circle {
    background-color: $color-cyan-strong;
    border-radius: 50%;
    width: 11px;
    height: 11px;
    border: 1.5px solid $color-white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    margin-right: 5px;
}

.filter-item .circle.bule {
    background-color: $color-blue-dark;
    margin-left: 5px;
}

.status-tags {
    padding-top: 16px;
}

.status-tag {
    padding: 4px 16px;
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
}

.for-sale-tag {
    background-color: $color-cyan-strong;
    color: $color-white;
    border-radius: 6px 0 0 6px;
}

.sold-tag {
    background-color: $color-blue-dark;
    color: $color-white;
}

.de-listed-tag {
    background-color: $color-white;
    color: $color-gray-dark;
    border-radius: 0 6px 6px 0;
}

.page {
    background-color: #ffffff;
    background-image: url('../assets/map.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}
</style>