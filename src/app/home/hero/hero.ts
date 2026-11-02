import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18n } from '../../core/i18n/i18n.service';
import { CV_PATH, PROFILE } from '../../core/links';
import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, RouterLink, Button, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'resetParallax()',
  },
})
export class Hero {
  private readonly i18n = inject(I18n);
  protected readonly t = this.i18n.t;
  protected readonly homePath = computed(() => this.i18n.path({ kind: 'home' }));
  protected readonly cvPath = computed(() => CV_PATH[this.i18n.lang()]);
  protected readonly profile = PROFILE;
  protected readonly whatsappUrl = computed(
    () => `${PROFILE.whatsapp}?text=${encodeURIComponent(this.t().contact.whatsappMessage)}`,
  );

  private readonly photo = viewChild.required<ElementRef<HTMLElement>>('photo');
  private frame = 0;

  /**
   * Parallax: las bolitas siguen al mouse en distintas profundidades.
   * Solo con mouse (no en táctil) y si no se pidió menos movimiento.
   * Se escribe una variable CSS por cuadro (requestAnimationFrame), sin pasar por Angular.
   */
  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || this.reducedMotion()) return;
    const host = event.currentTarget as HTMLElement;
    const rect = host.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.setParallax(x, y));
  }

  protected resetParallax(): void {
    cancelAnimationFrame(this.frame);
    this.setParallax(0, 0);
  }

  private setParallax(x: number, y: number): void {
    const style = this.photo().nativeElement.style;
    style.setProperty('--px', x.toFixed(3));
    style.setProperty('--py', y.toFixed(3));
  }

  private reducedMotion(): boolean {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
