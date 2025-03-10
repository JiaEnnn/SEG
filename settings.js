<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <img src="/Users/cnky/Documents/UoSM_Logo.png" />
        <ul class="navbar-list">
            <li><a href="index.html">Back</a></li>
        </ul>
    </nav>

    <div class="settings-container">
        <h1>Settings</h1>

        <label for="dark-mode">Enable Dark Mode:</label>
        <input type="checkbox" id="dark-mode">
        <br><br>

        <label for="notifications">Enable Notifications:</label>
        <input type="checkbox" id="notifications">
        <br><br>

        <label for="font-size">Font Size:</label>
        <select id="font-size">
            <option value="14px">Small</option>
            <option value="16px" selected>Medium</option>
            <option value="18px">Large</option>
            <option value="20px">Extra Large</option>
        </select>
        <br><br>

        <button onclick="saveSettings()">Save Settings</button>
    </div>

    <script src="settings.js"></script>
</body>
</html>
