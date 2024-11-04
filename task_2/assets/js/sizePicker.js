document.addEventListener("DOMContentLoaded", () => {
  const metricSystems = document.querySelectorAll(".size-metric-systems p");
  const sizeOptions = document.querySelectorAll(".size-options p");
  const selectedSize = document.querySelector(".selected-size-and-metric");
  let activeSize = document.querySelector(".size-options p.active");

  metricSystems.forEach((metric) => {
    metric.addEventListener("click", () => {
      metricSystems.forEach((m) => m.classList.remove("selected"));
      metric.classList.add("selected");

      const selectedMetric = metric.getAttribute("data-metric");

      updateSizeOptions(selectedMetric);

      updateSelectedSize(selectedMetric, activeSize);
    });
  });

  function updateSizeOptions(metric) {
    sizeOptions.forEach((sizeOption) => {
      const sizeValue = sizeOption.getAttribute(`data-${metric}`);
      sizeOption.textContent = sizeValue;
    });
  }

  function updateSelectedSize(metric, sizeOption) {
    const selectedMetric = document.querySelector(
      ".size-metric-systems .selected"
    );
    const selectedMetricText = selectedMetric.textContent;
    const sizeValue = sizeOption.getAttribute(`data-${metric}`);
    selectedSize.textContent = `${sizeValue} ${selectedMetricText}`;
  }

  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", () => {
      if (sizeOption.classList.contains("disabled")) return;

      sizeOptions.forEach((option) => option.classList.remove("active"));
      sizeOption.classList.add("active");

      activeSize = sizeOption;

      const selectedMetric = document
        .querySelector(".size-metric-systems .selected")
        .getAttribute("data-metric");
      updateSelectedSize(selectedMetric, sizeOption);
    });
  });
});
