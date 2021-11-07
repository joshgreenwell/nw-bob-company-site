export const Calendar = () => {
  const iframe = `<iframe
    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23616161&ctz=America%2FLos_Angeles&showCalendars=0&mode=MONTH&showTabs=0&showPrint=0&showTitle=0&src=NmJqcWlzcHU4M2pubzkyMnU2M3F1Ym92ZWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB"
    style="border-width:0"
    width="100%"
    height="800"
    frameBorder="0"
    scrolling="no"
  />`
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{ width: '100%', maxWidth: 1000 }}
        dangerouslySetInnerHTML={{ __html: iframe }}
      />
    </div>
  )
}
