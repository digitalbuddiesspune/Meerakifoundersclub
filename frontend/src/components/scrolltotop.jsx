export default function ScrollToTop() {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    return (
      <button
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        ↑ Top
      </button>
    );
  }