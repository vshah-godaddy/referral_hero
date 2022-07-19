
module.exports = {
    filteredBody (body, whitelist) {
        const items = {};
        Object.keys(body).forEach(key => {
        if (whitelist.indexOf(key) >= 0) {
            items[key] = body[key];
    
        }
        });
        return items;
  }
}