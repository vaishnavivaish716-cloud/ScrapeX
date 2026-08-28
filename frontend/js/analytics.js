async function loadAnalytics() {

    try {

        const response =
            await fetch(
                API + "/analytics"
            );


        const data =
            await response.json();


        if (
            typeof renderTopProducts ===
            "function"
        ) {

            renderTopProducts(
                data.top_products
            );

        }


    } catch (error) {

        console.error(
            "Analytics Error:",
            error
        );

    }

}