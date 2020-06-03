DownCount
=========

jQuery countdown plugin that accounts for timezone.

#Usage

```JS
$('.countdown').downCount({
    date: '08/27/2013 12:00:00',
    offset: +1
}
```

#Options
Option | Description
---|---
date | Target date, ex `08/27/2013 12:00:00`
offset | UTC Timezone offset (default +1 - Europe)

UTC Zones: http://en.wikipedia.org/wiki/List_of_UTC_time_offsets#/media/File:World_Time_Zones_Map.png

You can also append a callback function which is called when countdown finishes.
