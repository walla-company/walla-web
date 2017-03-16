import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';

declare var WordCloud, jQuery;

@Component({
    moduleId: module.id,
    selector: 'wl-word-cloud',
    template: '<canvas #target></canvas>'
})
export class WordCloudComponent implements OnInit {
    @Input() words: { word: string, count: number }[] = [];
    @Input() maxSize: number = 75;
    @Input() width: number = 1000;
    @Input() height: number = 700;
    @ViewChild('target') target: ElementRef;

    ngOnInit() {
        this.target.nativeElement.setAttribute('width', this.width);
        this.target.nativeElement.setAttribute('height', this.height);
        this.initialize();
    }

    initialize() {
        let scale = this.words.map(w => Object({ word: w.word, count: Math.pow(w.count, 2) }));
        let max = Math.max.apply(null, scale.map(w => w.count));
        scale = scale.map(w => Object({ word: w.word, count: (w.count / max) * this.maxSize }));
        let outArray = scale.map(w => [w.word, w.count]);

        WordCloud(this.target.nativeElement, {
            gridSize: Math.round(16 * this.width / 1024),
            fontFamily: 'Times, serif',
            rotateRatio: 0.5,
            rotationSteps: 2,
            list: outArray,
            minSize: 10
        });
    }
}
