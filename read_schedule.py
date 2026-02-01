import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('public/MH_Schedules_2026.xlsx')

# Print column names
print("Column names:")
print(df.columns.tolist())
print("\n")

# Print shape
print(f"Shape: {df.shape}")
print("\n")

# Print first 30 rows with all columns
print("First 30 rows:")
for idx, row in df.head(30).iterrows():
    print(f"\nRow {idx}:")
    for col in df.columns:
        if pd.notna(row[col]):
            print(f"  {col}: {row[col]}")

# Export to JSON for easier parsing
data = df.to_dict('records')
with open('schedule_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, default=str)

print("\n\nData exported to schedule_data.json")
