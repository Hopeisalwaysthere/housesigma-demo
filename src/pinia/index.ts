import { defineStore } from 'pinia'

export interface filterState {
    priceMin: number,
    priceMax: number,
    keywords: string,
    bedroom: string[],
    bathroom: string,
    garage: string
}

export const defaultFilterState = {
    priceMin: 0,
    priceMax: 5000,
    keywords: '',
    bedroom: ['Any'],
    bathroom: 'Any',
    garage: 'Any'
}

export const useFilterStore = defineStore('main', {
    state: () => {
        return {
            priceMin: 0,
            priceMax: 5000,
            keywords: '',
            bedroom: ['Any'],
            bathroom: 'Any',
            garage: 'Any'
        }
    },
    actions: {
        setFilterState(state: filterState) {
            this.priceMin = state.priceMin
            this.priceMax = state.priceMax
            this.keywords = state.keywords
            this.bedroom = state.bedroom
            this.bathroom = state.bathroom
            this.garage = state.garage
            localStorage.setItem('filterState', JSON.stringify(state))
        },
        getFilterState(): filterState {
            const state = localStorage.getItem('filterState')
            if (state) {
                const filterState = JSON.parse(state)
                this.setFilterState(filterState)
                return filterState
            }
            return this
        }
    }
})