# M04 — WORLD

## Goal
Represent the shared Otaku world: places, discovery objects, world activities and contextual state.

## Architecture
World data is normalized and queried by region/category. UI loads only the visible slice.

## MORISE
Coordinates discovery and can surface contextual activities, but cannot invent factual location/statistics without evidence.

## Performance
Virtualized lists/maps, lazy media, cache safe public metadata, pagination and bounded queries.

## Acceptance
World loads progressively, filters work, no fake statistics are shown, and unavailable external data produces a clear degraded state.
