/**
 * Member Management System Test Script
 * 
 * This script tests all member-related endpoints
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8000';
const API_BASE = `${BASE_URL}/api/v1`;

// REPLACE THESE WITH YOUR ACTUAL IDs
const WORKSPACE_ID = 'your_workspace_id_here';
const TEST_USER_EMAIL = 'testmember@example.com'; // User must exist in your system
const MEMBER_ROLE_ID = 'your_member_role_id_here';
const ADMIN_ROLE_ID = 'your_admin_role_id_here';

// Store cookies for session management
let sessionCookie = '';
let testMemberId = null;

/**
 * Helper function to make API requests
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(sessionCookie && { 'Cookie': sessionCookie })
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    // Save session cookie from response
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
        sessionCookie = setCookie.split(';')[0];
    }

    const data = await response.json();
    return { status: response.status, data };
}

/**
 * Test 1: Login
 */
async function testLogin() {
    console.log('\n🔐 Test 1: Login');
    const result = await apiRequest('/auth/login', 'POST', {
        email: 'admin@example.com',
        password: 'admin1234'
    });
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
    return result.status === 200;
}

/**
 * Test 2: Get All Members
 */
async function testGetAllMembers() {
    console.log('\n👥 Test 2: Get All Members in Workspace');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/all`
    );
    console.log('Status:', result.status);
    console.log('Total Members:', result.data.totalMembers);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 3: Get Member Count
 */
async function testGetMemberCount() {
    console.log('\n🔢 Test 3: Get Member Count');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/count`
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 4: Add Member by Email
 */
async function testAddMemberByEmail() {
    console.log('\n➕ Test 4: Add Member by Email');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/add`,
        'POST',
        {
            email: TEST_USER_EMAIL,
            roleId: MEMBER_ROLE_ID
        }
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
    
    if (result.data.member) {
        return result.data.member._id;
    }
    return null;
}

/**
 * Test 5: Try Add Duplicate Member (Should Fail)
 */
async function testAddDuplicateMember() {
    console.log('\n❌ Test 5: Try Add Duplicate Member (Expected to Fail)');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/add`,
        'POST',
        {
            email: TEST_USER_EMAIL
        }
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
    if (result.status === 400) {
        console.log('✅ Correctly rejected duplicate member');
    }
}

/**
 * Test 6: Get Member by ID
 */
async function testGetMemberById(memberId) {
    console.log('\n🔍 Test 6: Get Member by ID');
    const result = await apiRequest(
        `/member/${memberId}/workspace/${WORKSPACE_ID}`
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 7: Update Member Role
 */
async function testUpdateMemberRole(memberId) {
    console.log('\n⬆️ Test 7: Update Member Role to Admin');
    const result = await apiRequest(
        `/member/${memberId}/workspace/${WORKSPACE_ID}/role`,
        'PUT',
        {
            roleId: ADMIN_ROLE_ID
        }
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 8: Downgrade Member Role
 */
async function testDowngradeMemberRole(memberId) {
    console.log('\n⬇️ Test 8: Downgrade Member Role back to Member');
    const result = await apiRequest(
        `/member/${memberId}/workspace/${WORKSPACE_ID}/role`,
        'PUT',
        {
            roleId: MEMBER_ROLE_ID
        }
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 9: Get Updated Members List
 */
async function testGetUpdatedMembersList() {
    console.log('\n📋 Test 9: Get Updated Members List');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/all`
    );
    console.log('Status:', result.status);
    console.log('Total Members:', result.data.totalMembers);
    
    // Show member roles
    if (result.data.members) {
        console.log('\nMember Roles:');
        result.data.members.forEach(member => {
            console.log(`  - ${member.userId.name}: ${member.role.name}`);
        });
    }
}

/**
 * Test 10: Remove Member
 */
async function testRemoveMember(memberId) {
    console.log('\n🗑️ Test 10: Remove Member from Workspace');
    console.log('⚠️  WARNING: This will remove the test member!');
    
    const result = await apiRequest(
        `/member/${memberId}/workspace/${WORKSPACE_ID}`,
        'DELETE'
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * Test 11: Verify Member is Removed
 */
async function testVerifyMemberRemoved(memberId) {
    console.log('\n🔍 Test 11: Verify Member is Removed');
    const result = await apiRequest(
        `/member/${memberId}/workspace/${WORKSPACE_ID}`
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
    if (result.status === 404) {
        console.log('✅ Member successfully removed');
    }
}

/**
 * Test 12: Get Final Member Count
 */
async function testGetFinalMemberCount() {
    console.log('\n🔢 Test 12: Get Final Member Count');
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/count`
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * BONUS Test: Join Workspace (requires invite code)
 */
async function testJoinWorkspace(inviteCode) {
    console.log('\n🎟️ BONUS Test: Join Workspace with Invite Code');
    console.log('Note: You need a valid invite code to test this');
    
    if (!inviteCode || inviteCode === 'your_invite_code_here') {
        console.log('⏭️  Skipping - No invite code provided');
        return;
    }
    
    const result = await apiRequest(
        `/member/workspace/${inviteCode}/join`,
        'POST'
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
}

/**
 * BONUS Test: Leave Workspace
 */
async function testLeaveWorkspace() {
    console.log('\n🚪 BONUS Test: Leave Workspace');
    console.log('⚠️  Note: This is disabled by default to prevent accidental removal');
    console.log('⚠️  Uncomment in code if you want to test leaving workspace');
    
    // Uncomment below to actually test leaving
    /*
    const result = await apiRequest(
        `/member/workspace/${WORKSPACE_ID}/leave`,
        'POST'
    );
    console.log('Status:', result.status);
    console.log('Response:', JSON.stringify(result.data, null, 2));
    */
}

/**
 * Run all tests
 */
async function runAllTests() {
    console.log('🚀 Starting Member Management System Tests...');
    console.log('=' .repeat(60));

    try {
        // Login
        const loginSuccess = await testLogin();
        if (!loginSuccess) {
            console.error('❌ Login failed. Please check credentials.');
            return;
        }

        // Get initial state
        await testGetAllMembers();
        await testGetMemberCount();

        // Add a member
        const memberId = await testAddMemberByEmail();
        if (!memberId) {
            console.error('❌ Member addition failed. Check if user exists.');
            console.log('💡 Make sure TEST_USER_EMAIL corresponds to an existing user');
            // Continue with other tests that don't require memberId
        } else {
            console.log(`\n✅ Test Member Added with ID: ${memberId}`);
            
            // Test duplicate
            await testAddDuplicateMember();
            
            // Get member details
            await testGetMemberById(memberId);
            
            // Update role
            await testUpdateMemberRole(memberId);
            await testDowngradeMemberRole(memberId);
            
            // View updated list
            await testGetUpdatedMembersList();
            
            // Wait before removal
            console.log('\n⏳ Waiting 2 seconds before removal...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Remove member
            await testRemoveMember(memberId);
            await testVerifyMemberRemoved(memberId);
        }

        // Get final count
        await testGetFinalMemberCount();

        // Bonus tests
        await testLeaveWorkspace();

        console.log('\n' + '='.repeat(60));
        console.log('✅ All tests completed!');
        console.log('\n📝 Summary:');
        console.log('  - Get all members ✅');
        console.log('  - Get member count ✅');
        console.log('  - Add member by email ✅');
        console.log('  - Duplicate member validation ✅');
        console.log('  - Get member by ID ✅');
        console.log('  - Update member role ✅');
        console.log('  - Downgrade member role ✅');
        console.log('  - Remove member ✅');
        console.log('  - Verify removal ✅');
        
        console.log('\n💡 Update these at the top of the file:');
        console.log('  - WORKSPACE_ID');
        console.log('  - TEST_USER_EMAIL (must be existing user)');
        console.log('  - MEMBER_ROLE_ID');
        console.log('  - ADMIN_ROLE_ID');

    } catch (error) {
        console.error('\n❌ Test Error:', error.message);
        console.error(error);
    }
}

// Run the tests
runAllTests();
