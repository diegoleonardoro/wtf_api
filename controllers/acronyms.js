const fs = require('fs');
const fsPromises = fs.promises;


//@desc     returns a list of acronyms, paginated using query parameters
//@route    GET /acronym
//@access   public
exports.returnAcronyms = async (req, res, next) => {

    let acronymsData = await fsPromises.readFile('acronym.json');
    acronymsData = JSON.parse(acronymsData);

    const from = parseInt(req.query.from); //  this is the page
    const limit = parseInt(req.query.limit); // this is the limit of items 
    const search = req.query.search.toUpperCase();


    let page = from;
    let limitFlag = limit

    const arrayOfMatchedItems = [];

    const matchDataItemsWithQuery = () => {
        for (let i = 0; i < acronymsData.length; i++) {
            let key = Object.keys(acronymsData[i])[0];
            if (key === search) {
                arrayOfMatchedItems.push(acronymsData[i])
            }
        }
    }
    matchDataItemsWithQuery();

    const filteredArrayOfMatchedItems = [];

    const slicearrAyOfMatchedItems = () => {
        if (limit <= arrayOfMatchedItems.length) {

            let arrayMatched = []

            for (var i = 0; i < arrayOfMatchedItems.length; i++) {

                arrayMatched.push(arrayOfMatchedItems[i]);

                if (i === limitFlag - 1) {

                    filteredArrayOfMatchedItems.push(arrayMatched);
                    arrayMatched = []

                    limitFlag = limitFlag + limitFlag;

                } else if (i === arrayOfMatchedItems.length - 1) {
                    filteredArrayOfMatchedItems.push(arrayMatched);
                }
            }

        } else {

            filteredArrayOfMatchedItems.push(arrayOfMatchedItems);
        }
    }
    slicearrAyOfMatchedItems();




    const pagination = {};
    const createPagination = () => {
        if (from >= filteredArrayOfMatchedItems.length) {
            page = filteredArrayOfMatchedItems.length - 1;
        }

        if (page === filteredArrayOfMatchedItems.length - 1) {
            pagination.next = "No next page";
        } else {
            pagination.next = page + 1
        }

        if (page === 0) {
            pagination.prev = "No previous page";
        } else {
            pagination.prev = page - 1;
        }
    }

    createPagination();

    res
        .status(200)
        .json({ success: true, amountOfAcronyms: arrayOfMatchedItems.length, pagination, data: filteredArrayOfMatchedItems[page] })


};


//@desc     receives an acronym and definition strings
//@route    POST /acronym
//@access   public
exports.addAcronyms = async (req, res, next) => {

    let acronymsData = await fs.readFileSync('acronym.json');
    acronymsData = JSON.parse(acronymsData);
    acronymsData.push(req.body)

    try {
        await fs.writeFile("acronym.json", JSON.stringify(acronymsData), () => {
            console.log("New data added");
        });
        res
            .status(200)
            .json({ success: true, acronymAdded: req.body })

    } catch (error) {
        res
            .status(500)
            .json({ success: false })
    }


};






//@desc     updates acronym by receiving an acronym and definition strings
//@route    PUT /acronym
//@access   private
exports.updateAcronyms = async (req, res, next) => {

    const acronym = req.params.acronym;
    const newAcronymValue = req.body.newAcronymValue


    let acronymsData = await fs.readFileSync('acronym.json');
    acronymsData = JSON.parse(acronymsData);


    matchAcronym: for (let i = 0; i < acronymsData.length; i++) {

        for (const [key, value] of Object.entries(acronymsData[i])) {

            if (acronym.toUpperCase() === key.toUpperCase()) {

                acronymsData[i] = { [acronym]: newAcronymValue }

                try {
                    await fs.writeFile("acronym.json", JSON.stringify(acronymsData), () => {
                        console.log("Resource updated");
                    });

                    res
                        .status(202)
                        .json({ success: true, message: "Resource updated" });

                } catch (error) {

                    res
                        .status(500)
                        .json({ success: false });
                }

                break matchAcronym;

            } else if (i === acronymsData.length - 1) {

                res
                    .status(404)
                    .json({ success: false, message: "Resource not found" })

            }

        }

    }

};


//@desc     deletes acronym 
//@route    DELETE /acronym
//@access   private
exports.deleteAcronyms = async (req, res, next) => {

    const acronym = req.params.acronym;

    let acronymsData = await fs.readFileSync('acronym.json');
    acronymsData = JSON.parse(acronymsData);

    matchAcronym: for (let i = 0; i < acronymsData.length; i++) {

        for (const [key, value] of Object.entries(acronymsData[i])) {

            if (acronym.toUpperCase() === key.toUpperCase()) {

                acronymsData.splice(i, 1)

                try {
                    await fs.writeFile("acronym.json", JSON.stringify(acronymsData), () => {

                        console.log("Resource deleted");
                    });

                    res
                        .status(202)
                        .json({ success: true, message: "Resource deleted" });

                } catch (error) {

                    res
                        .status(500)
                        .json({ success: false });
                }

                break matchAcronym;

            } else if (i === acronymsData.length - 1) {

                res
                    .status(404)
                    .json({ success: false, message: "Resource not found" })

            }
        }

    }


};
