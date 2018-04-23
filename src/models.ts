
export type RouteViews = 'all' | 'completed' | 'active';

export interface AppState {
    currentView?: RouteViews;
}
