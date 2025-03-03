import { writable } from 'svelte/store';
import type {Component} from "svelte";

interface DrawerState {
  isOpen: boolean;
  component: Component | null;
  props?: Record<string, any>;
}

const initialState: DrawerState = {
  isOpen: false,
  component: null,
  props: {}
}

export const drawer = writable<DrawerState>(initialState);

export function openDrawer(component: Component, props: Record<string, any> = {}) {
  drawer.set({
    isOpen: true,
    component,
    props
  });
}

export function closeDrawer() {
  drawer.set(initialState);
}


export const isDrawerOpen = writable(false);
