# Location Data Files

This folder contains the JSON data files used by the location API endpoints:

- `state.json` - List of all states in India
- `district.json` - List of all districts mapped to states
- `college.json` - List of all colleges mapped to states and districts

## Data Structure

### state.json
```json
[
  {
    "no": "1",
    "name": "Andhra Pradesh"
  }
]
```

### district.json
```json
[
  {
    "no": "1",
    "sno": "1",
    "name": "District Name"
  }
]
```
- `no`: District unique ID
- `sno`: State number (references state.json)
- `name`: District name

### college.json
```json
[
  {
    "Name": "College Name",
    "State": "State Name",
    "District": "District Name"
  }
]
```

## API Endpoints

These files are served via:

- `GET /api/location/states` - Returns all states
- `GET /api/location/districts` - Returns all districts (optional: ?stateNo=1)
- `GET /api/location/colleges` - Returns all colleges (optional: ?state=StateName&district=DistrictName)
- `POST /api/location/reload-cache` - Manually reload the cache

## Important Notes

1. **These files MUST be committed to git** so they're available when deployed
2. Data is cached in memory for 24 hours for better performance
3. Files are loaded on server startup and cached
4. Total counts: ~29 states, ~725 districts, ~70,000 colleges

## Updating Data

If you need to update the location data:

1. Edit the JSON files in this folder
2. Commit and push changes
3. Redeploy the backend
4. OR use the reload-cache endpoint: `POST /api/location/reload-cache`
