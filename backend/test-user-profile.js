/**
 * User Profile Management System - Testing Guide
 * 
 * Prerequisites:
 * 1. Server must be running (npm start)
 * 2. User must be authenticated (login first)
 * 3. Replace SESSION_COOKIE with your actual session cookie
 * 
 * To get session cookie:
 * 1. Login via POST /api/v1/auth/login
 * 2. Check browser DevTools > Application > Cookies
 * 3. Copy the 'connect.sid' cookie value
 */

const BASE_URL = 'http://localhost:5000/api/v1/user';

// Replace with your actual session cookie after login
const SESSION_COOKIE = 'connect.sid=your-session-cookie-here';

// Test data
const testData = {
    profileUpdate: {
        name: "Updated Test User",
        description: "Senior Software Developer | Open Source Enthusiast",
        profilePicture: "https://avatars.githubusercontent.com/u/12345678"
    },
    passwordChange: {
        currentPassword: "TestPassword123",
        newPassword: "NewTestPassword123",
        confirmPassword: "NewTestPassword123"
    }
};

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': SESSION_COOKIE
        }
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`${options.method || 'GET'} ${endpoint}`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`${'='.repeat(80)}`);
    console.log(JSON.stringify(data, null, 2));
    
    return { response, data };
}

// Test functions
async function testGetCurrentUser() {
    console.log('\n📋 TEST: Get Current User (Basic Info)');
    await apiCall('/current');
}

async function testGetUserProfile() {
    console.log('\n👤 TEST: Get User Profile (Detailed with Statistics)');
    await apiCall('/profile');
}

async function testUpdateProfile() {
    console.log('\n✏️  TEST: Update User Profile');
    await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify(testData.profileUpdate)
    });
}

async function testUpdateProfilePartial() {
    console.log('\n✏️  TEST: Partial Profile Update (Name Only)');
    await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify({ name: "Test User Updated" })
    });
}

async function testUpdateProfileInvalidEmail() {
    console.log('\n❌ TEST: Update Profile with Invalid Email');
    await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify({ email: "invalid-email" })
    });
}

async function testUpdateProfileNoFields() {
    console.log('\n❌ TEST: Update Profile with No Fields');
    await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify({})
    });
}

async function testChangePassword() {
    console.log('\n🔑 TEST: Change Password');
    await apiCall('/password', {
        method: 'PUT',
        body: JSON.stringify(testData.passwordChange)
    });
}

async function testChangePasswordMismatch() {
    console.log('\n❌ TEST: Change Password with Mismatch');
    await apiCall('/password', {
        method: 'PUT',
        body: JSON.stringify({
            currentPassword: "TestPassword123",
            newPassword: "NewPassword123",
            confirmPassword: "DifferentPassword123"
        })
    });
}

async function testChangePasswordWeak() {
    console.log('\n❌ TEST: Change Password with Weak Password');
    await apiCall('/password', {
        method: 'PUT',
        body: JSON.stringify({
            currentPassword: "TestPassword123",
            newPassword: "weak",
            confirmPassword: "weak"
        })
    });
}

async function testGetActivityDefault() {
    console.log('\n📊 TEST: Get Activity Logs (Default)');
    await apiCall('/activity');
}

async function testGetActivityWithFilters() {
    console.log('\n📊 TEST: Get Activity Logs with Filters');
    await apiCall('/activity?limit=10&page=1&type=project');
}

async function testGetActivityProjectType() {
    console.log('\n📊 TEST: Get Activity Logs (Project Type Only)');
    await apiCall('/activity?type=project&limit=20');
}

async function testGetActivityDateRange() {
    console.log('\n📊 TEST: Get Activity Logs with Date Range');
    const startDate = new Date('2024-10-01').toISOString();
    const endDate = new Date().toISOString();
    await apiCall(`/activity?startDate=${startDate}&endDate=${endDate}`);
}

async function testGetActivityInvalidLimit() {
    console.log('\n❌ TEST: Get Activity with Invalid Limit');
    await apiCall('/activity?limit=200'); // Max is 100
}

// Comprehensive test suite
async function runAllTests() {
    console.log('\n' + '🚀'.repeat(40));
    console.log('USER PROFILE MANAGEMENT - COMPREHENSIVE TEST SUITE');
    console.log('🚀'.repeat(40));

    try {
        // User Info Tests
        await testGetCurrentUser();
        await testGetUserProfile();

        // Profile Update Tests
        await testUpdateProfile();
        await testUpdateProfilePartial();
        await testUpdateProfileInvalidEmail();
        await testUpdateProfileNoFields();

        // Password Change Tests
        await testChangePassword();
        await testChangePasswordMismatch();
        await testChangePasswordWeak();

        // Activity Log Tests
        await testGetActivityDefault();
        await testGetActivityWithFilters();
        await testGetActivityProjectType();
        await testGetActivityDateRange();
        await testGetActivityInvalidLimit();

        console.log('\n' + '✅'.repeat(40));
        console.log('ALL TESTS COMPLETED');
        console.log('✅'.repeat(40) + '\n');

    } catch (error) {
        console.error('\n❌ Test Suite Error:', error.message);
    }
}

// Individual test runners
async function runBasicTests() {
    console.log('\n🧪 Running Basic Tests...\n');
    await testGetCurrentUser();
    await testGetUserProfile();
}

async function runProfileUpdateTests() {
    console.log('\n🧪 Running Profile Update Tests...\n');
    await testUpdateProfile();
    await testUpdateProfilePartial();
    await testUpdateProfileInvalidEmail();
    await testUpdateProfileNoFields();
}

async function runPasswordTests() {
    console.log('\n🧪 Running Password Tests...\n');
    await testChangePassword();
    await testChangePasswordMismatch();
    await testChangePasswordWeak();
}

async function runActivityTests() {
    console.log('\n🧪 Running Activity Tests...\n');
    await testGetActivityDefault();
    await testGetActivityWithFilters();
    await testGetActivityProjectType();
    await testGetActivityDateRange();
    await testGetActivityInvalidLimit();
}

// Test account deactivation (use with caution!)
async function testDeactivateAccount() {
    console.log('\n⚠️  WARNING: This will deactivate the account!');
    console.log('Only run this test if you are sure.\n');
    
    const confirm = confirm('Are you sure you want to deactivate this account?');
    if (!confirm) {
        console.log('Test cancelled.');
        return;
    }

    await apiCall('/account', { method: 'DELETE' });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllTests,
        runBasicTests,
        runProfileUpdateTests,
        runPasswordTests,
        runActivityTests,
        testDeactivateAccount
    };
}

// Usage instructions
console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  USER PROFILE MANAGEMENT - TEST SUITE                           │
│                                                                 │
│  How to use:                                                    │
│  1. Update SESSION_COOKIE with your actual session cookie      │
│  2. Run: node test-user-profile.js                             │
│                                                                 │
│  Available functions:                                           │
│  - runAllTests()           : Run complete test suite            │
│  - runBasicTests()         : Test basic user info endpoints     │
│  - runProfileUpdateTests() : Test profile update functionality  │
│  - runPasswordTests()      : Test password change functionality │
│  - runActivityTests()      : Test activity log endpoints        │
│                                                                 │
│  Manual testing:                                                │
│  - Call individual test functions as needed                     │
│  - testDeactivateAccount() : Deactivate account (CAUTION!)      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
`);

// Auto-run all tests if executed directly
if (require.main === module) {
    runAllTests();
}
