async function loadHistory() {

    try {

        const response =
            await fetch(
                API + "/history"
            );


        const data =
            await response.json();


        const table =
            document.getElementById(
                "historyTable"
            );


        if (!data || data.length === 0) {

            table.innerHTML = `

                <tr>

                    <td colspan="4">

                        No scraping history.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            data.map(
                item => `

                <tr>

                    <td>
                        ${escapeHtml(item.url)}
                    </td>

                    <td>
                        ${item.products_count}
                    </td>

                    <td>

                        <span class="status-badge">

                            ${escapeHtml(item.status)}

                        </span>

                    </td>

                    <td>
                        ${item.scraped_at}
                    </td>

                </tr>

            `
            ).join("");


    } catch (error) {

        console.error(
            "History Error:",
            error
        );

    }

}