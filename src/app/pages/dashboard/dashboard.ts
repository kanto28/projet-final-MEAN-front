import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { BestSellingWidget } from './components/bestsellingwidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RevenueStreamWidget, BestSellingWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />
            </div>
        </div>
    `
})
export class Dashboard {}
